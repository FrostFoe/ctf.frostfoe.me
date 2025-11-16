-- ============================================
-- Admin RLS Policies for Events and Challenges
-- Allows admins to perform CRUD operations
-- ============================================

-- Events: Admin can INSERT
CREATE POLICY "Admin can insert events"
  ON public.events FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Events: Admin can UPDATE
CREATE POLICY "Admin can update events"
  ON public.events FOR UPDATE
  USING (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Events: Admin can DELETE
CREATE POLICY "Admin can delete events"
  ON public.events FOR DELETE
  USING (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Challenges: Admin can INSERT
CREATE POLICY "Admin can insert challenges"
  ON public.challenges FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Challenges: Admin can UPDATE
CREATE POLICY "Admin can update challenges"
  ON public.challenges FOR UPDATE
  USING (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Challenges: Admin can DELETE
CREATE POLICY "Admin can delete challenges"
  ON public.challenges FOR DELETE
  USING (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Users: Admin can UPDATE (for role changes)
CREATE POLICY "Admin can update users"
  ON public.users FOR UPDATE
  USING (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Users: Admin can DELETE
CREATE POLICY "Admin can delete users"
  ON public.users FOR DELETE
  USING (
    auth.uid() IS NOT NULL AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
