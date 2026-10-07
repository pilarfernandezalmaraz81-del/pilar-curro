# Security Specification — Pilar Empleo IA (`security_spec.md`)

## 1. Data Invariants
1. **Identity Ownership Invariant**: Every document in `/candidaturas/{candidaturaId}` and `/progresoPlan/{userId}` MUST belong exclusively to the authenticated, email-verified user (`request.auth.uid == data.ownerId` and `request.auth.token.email_verified == true`).
2. **Strict Schema & Volumetric Bounds**: Every string field enforces strict `.size()` boundaries matching `firebase-blueprint.json`, and `keys().hasAll(...)` + `keys().hasOnly(...)` block shadow fields.
3. **Immutability Invariant**: `ownerId` and `createdAt` cannot be modified after creation (`incoming().ownerId == existing().ownerId && incoming().createdAt == existing().createdAt`).
4. **Temporal Integrity**: `createdAt` (on create) and `updatedAt` (on create/update) must strictly equal `request.time`.
5. **Query Enforcer**: `allow list` on `/candidaturas/{candidaturaId}` evaluates `resource.data.ownerId == request.auth.uid`.

## 2. The "Dirty Dozen" Payloads
1. Unauthenticated write to `/candidaturas/cand_1` -> `PERMISSION_DENIED`
2. Unverified email (`email_verified == false`) write -> `PERMISSION_DENIED`
3. Spoofed `ownerId` (`ownerId: "other_user"`) on create -> `PERMISSION_DENIED`
4. Shadow field injection (`isAdmin: true`) on create -> `PERMISSION_DENIED`
5. Shadow field injection (`ghostField: "x"`) on update -> `PERMISSION_DENIED`
6. Mutating immutable `ownerId` on update -> `PERMISSION_DENIED`
7. Mutating immutable `createdAt` on update -> `PERMISSION_DENIED`
8. Forged client timestamp (`updatedAt != request.time`) -> `PERMISSION_DENIED`
9. Invalid `estado` enum value (`estado: "Hacked"`) -> `PERMISSION_DENIED`
10. Oversized `notas` field (`> 2000` chars) -> `PERMISSION_DENIED`
11. Poisoned document ID (`> 128` chars or invalid regex) -> `PERMISSION_DENIED`
12. Cross-user read/list (`resource.data.ownerId != request.auth.uid`) -> `PERMISSION_DENIED`
