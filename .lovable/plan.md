

## Plan: Create Admin User

### Steps

**1. Create user in Supabase Auth**
- Use the Supabase SQL editor to create the user `m.amin.rezai@gmail.com` with password `Jkr041044#` via `auth.users` insert (using Supabase's built-in function)
- This must be done via a database migration that calls `extensions.pgcrypto` to hash the password

**2. Assign admin role**
- Insert a row into `user_roles` table linking the new user's ID with the `admin` role

**3. Fix build error**
- Install `@supabase/supabase-js` package (missing dependency causing the TS2307 error)

### Technical Detail

Single migration SQL will:
1. Use Supabase's `auth.users` insert to create the user with a pre-hashed password
2. Insert into `public.user_roles` with `role = 'admin'`

The build error fix is a simple `npm install @supabase/supabase-js`.

