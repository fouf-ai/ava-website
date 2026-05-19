-- AVA Website — Initial Seed Data
-- Run AFTER schema.sql

SET NAMES utf8mb4;

-- -------------------------------------------------------
-- Impact statistics (Year 0 — 2026 cohort)
-- -------------------------------------------------------
INSERT INTO statistics (stat_key, value, label_fr, label_en, icon) VALUES
  ('students_trained',    23,  '23 étudiants formés',           '23 students trained',           'graduation-cap'),
  ('countries',            4,  '4 pays représentés',            '4 countries represented',       'globe-africa'),
  ('active_programs',      3,  '3 programmes actifs',           '3 active programs',             'book-open'),
  ('partners',             6,  '6 partenaires institutionnels', '6 institutional partners',      'handshake'),
  ('cohort_year',       2026,  'Cohorte 2026',                  '2026 cohort',                   'calendar')
ON DUPLICATE KEY UPDATE
  value     = VALUES(value),
  label_fr  = VALUES(label_fr),
  label_en  = VALUES(label_en),
  icon      = VALUES(icon);

-- -------------------------------------------------------
-- Admin user  (password MUST be changed immediately after first login)
-- Hash below = bcrypt of 'ChangeMe2026!'
-- -------------------------------------------------------
INSERT INTO users (email, password_hash, full_name, role, lang) VALUES
  ('foufkagna@gmail.com',
   '$2y$12$placeholder_change_this_hash_immediately_XXXXXXXXX',
   'Jean-Lucien Fouf-Kagna',
   'admin',
   'fr')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), role = VALUES(role);

-- NOTE: After running this seed, go to:
--   https://africanvisionaries.org/setup/reset_password.php
-- (created in Phase 2) to set a real bcrypt password.

-- -------------------------------------------------------
-- Team members (founding team — update photos after upload)
-- -------------------------------------------------------
INSERT INTO team_members (full_name, title_fr, title_en, sort_order) VALUES
  ('Jean-Lucien Fouf-Kagna Grebaye',
   'Fondateur & Directeur Exécutif',
   'Founder & Executive Director',
   1),
  ('Équipe AVA',
   'Membre Fondateur',
   'Founding Member',
   2)
ON DUPLICATE KEY UPDATE sort_order = VALUES(sort_order);
