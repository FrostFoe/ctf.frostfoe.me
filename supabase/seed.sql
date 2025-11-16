-- ============================================
-- Seed CTF Data from JSON
-- This migrates challenges and events to Supabase
-- ============================================

-- Insert Events
INSERT INTO public.events (slug, title, subtitle, description, image, badge, status, ctf_type, total_challenges, start_date, end_date)
VALUES
  (
    'ctf-try-out',
    'CTF ট্রাই আউট',
    'প্রথম অভিজ্ঞতার জন্য দুর্দান্ত',
    'নতুনদের জন্য একটি সাধারণ CTF ইভেন্ট',
    'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800',
    'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=100',
    'ongoing',
    'series',
    12,
    '2024-01-01 00:00:00+00',
    '2024-12-31 23:59:59+00'
  ),
  (
    'intermediate-ctf',
    'মধ্যম স্তরের CTF',
    'মধ্যবর্তী চ্যালেঞ্জ',
    'অভিজ্ঞ খেলোয়াড়দের জন্য',
    'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800',
    'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=100',
    'upcoming',
    'series',
    15,
    '2024-02-01 00:00:00+00',
    '2024-05-31 23:59:59+00'
  ),
  (
    'advanced-ctf',
    'উন্নত CTF',
    'চ্যালেঞ্জিং সমস্যা',
    'বিশেষজ্ঞদের জন্য',
    'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800',
    'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=100',
    'ended',
    'jeopardy',
    20,
    '2023-12-01 00:00:00+00',
    '2023-12-31 23:59:59+00'
  );

-- Insert Challenges for CTF Try Out (event_id will be 1 after insertion)
INSERT INTO public.challenges (event_id, series_id, series_order, title, description, category, difficulty, points, flag, tags)
VALUES
  (
    1,
    'ctf-try-out-series',
    1,
    'Hello CTF',
    'CTF এ স্বাগতম! এটি একটি সহজ চ্যালেঞ্জ দিয়ে শুরু করুন। ফ্ল্যাগটি flag{hello_ctf} এর মতো দেখায়।',
    'Introduction',
    'সহজ',
    50,
    'flag{hello_ctf}',
    ARRAY['beginner', 'introduction']
  ),
  (
    1,
    'ctf-try-out-series',
    2,
    'Base64 Decode',
    'এই base64 স্ট্রিং ডিকোড করুন: ZmxhZ3tiYXNlNjRfaXNfZWFzeX0=',
    'Cryptography',
    'সহজ',
    100,
    'flag{base64_is_easy}',
    ARRAY['encoding', 'decryption']
  ),
  (
    1,
    'ctf-try-out-series',
    3,
    'Simple Web Challenge',
    'এই ওয়েবসাইটের সোর্স কোডে ফ্ল্যাগ খুঁজে পান। পৃষ্ঠার শিরোনামে দেখুন!',
    'Web Security',
    'সহজ',
    75,
    'flag{view_source_code}',
    ARRAY['web', 'html']
  ),
  (
    1,
    'ctf-try-out-series',
    4,
    'ROT13 Cipher',
    'এই ROT13 এনক্রিপ্ট করা বার্তা ডিকোড করুন: "synt{ebg13_vf_sha}"',
    'Cryptography',
    'মধ্যম',
    150,
    'flag{rot13_is_fun}',
    ARRAY['cipher', 'cryptography']
  ),
  (
    1,
    'ctf-try-out-series',
    5,
    'SQL Injection Basics',
    'প্রদত্ত লগইন ফর্মে প্রবেশ করুন SQL ইনজেকশন ব্যবহার করে। ব্যবহারকারী হিসাবে যেকোনো শব্দ দিয়ে, পাসওয়ার্ড হিসাবে: " or "1"="1',
    'Web Security',
    'মধ্যম',
    200,
    'flag{sql_injection_works}',
    ARRAY['sql', 'injection', 'database']
  ),
  (
    1,
    'ctf-try-out-series',
    6,
    'Hex to ASCII',
    'এই হেক্স স্ট্রিংকে ASCII তে রূপান্তর করুন: 666c61677b686578325f61736369697d',
    'Cryptography',
    'সহজ',
    120,
    'flag{hex2_ascii}',
    ARRAY['encoding', 'hex']
  ),
  (
    1,
    'ctf-try-out-series',
    7,
    'Password Hash Crack',
    'এই SHA256 হ্যাশ ক্র্যাক করুন: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8 (এটি একটি সাধারণ শব্দের হ্যাশ)',
    'Cryptography',
    'মধ্যম',
    175,
    'flag{password123}',
    ARRAY['hash', 'cracking']
  ),
  (
    1,
    'ctf-try-out-series',
    8,
    'Binary Search',
    'একটি সমীকরণ সমাধান করুন: একটি সংখ্যা খুঁজে পান যা 2x + 3 = 27 সন্তুষ্ট করে।',
    'Programming',
    'সহজ',
    100,
    'flag{12}',
    ARRAY['math', 'programming']
  ),
  (
    1,
    'ctf-try-out-series',
    9,
    'Reverse Engineering',
    'একটি সহজ প্রোগ্রাম দেওয়া হয়েছে। এটি রিভার্স করুন এবং এটি কী করে তা খুঁজে বের করুন।',
    'Reverse Engineering',
    'কঠিন',
    300,
    'flag{reversed_code}',
    ARRAY['reversing', 'assembly']
  ),
  (
    1,
    'ctf-try-out-series',
    10,
    'XOR Cipher',
    'এই XOR এনক্রিপ্ট করা বার্তা ডিকোড করুন কী দিয়ে: key="secret"। সাইফারটেক্সট: 08140c150e00',
    'Cryptography',
    'মধ্যম',
    160,
    'flag{xor_cipher}',
    ARRAY['xor', 'encryption']
  ),
  (
    1,
    'ctf-try-out-series',
    11,
    'OSINT Challenge',
    'দেওয়া ছবিতে লুকানো তথ্য খুঁজে পান। EXIF ডেটা দেখুন।',
    'OSINT',
    'মধ্যম',
    180,
    'flag{exif_data_found}',
    ARRAY['osint', 'metadata']
  ),
  (
    1,
    'ctf-try-out-series',
    12,
    'Final Challenge',
    'এই সিরিজের সব চ্যালেঞ্জ সমাধান করুন এবং চূড়ান্ত ফ্ল্যাগ পান!',
    'General',
    'কঠিন',
    500,
    'flag{ctf_master}',
    ARRAY['final', 'general']
  );

-- Insert Achievements
INSERT INTO public.achievements (id, name, description, icon, rarity)
VALUES
  ('first_challenge', 'প্রথম রক্ত', 'আপনার প্রথম চ্যালেঞ্জ সমাধান করুন', '🏆', 'common'),
  ('speed_solver', 'দ্রুত সমাধানকারী', '১০ মিনিটের মধ্যে একটি চ্যালেঞ্জ সমাধান করুন', '⚡', 'rare'),
  ('hint_master', 'ইঙ্গিত বিশেষজ্ঞ', 'সব ইঙ্গিত ব্যবহার করে একটি চ্যালেঞ্জ সমাধান করুন', '💡', 'epic'),
  ('ten_solved', 'দশ চ্যালেঞ্জ সমাধানকারী', '১০টি চ্যালেঞ্জ সমাধান করুন', '🔟', 'rare'),
  ('twenty_solved', 'বিশ চ্যালেঞ্জ সমাধানকারী', '২০টি চ্যালেঞ্জ সমাধান করুন', '🏅', 'epic'),
  ('perfect_event', 'পারফেক্ট ইভেন্ট', 'একটি ইভেন্টের সব চ্যালেঞ্জ সমাধান করুন', '⭐', 'legendary'),
  ('no_hints', 'স্বাধীন সমাধানকারী', 'কোনো ইঙ্গিত ছাড়াই একটি চ্যালেঞ্জ সমাধান করুন', '🎯', 'epic'),
  ('consistent', 'সামঞ্জস্যপূর্ণ', '৭ দিনের স্ট্রিক তৈরি করুন', '🔥', 'rare');

-- Add some sample users if needed (you can comment this out if you already have users)
-- INSERT INTO public.users (username, password, role)
-- VALUES
--   ('admin', 'admin123', 'admin'),
--   ('player1', 'password', 'player'),
--   ('guest_user', 'guest', 'guest')
-- ON CONFLICT (username) DO NOTHING;
