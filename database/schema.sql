-- AVA Website — Database Schema
-- MySQL 8.0+ / MariaDB 10.4+
-- Run once via phpMyAdmin or mysql CLI

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- -------------------------------------------------------
-- users
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name     VARCHAR(120) NOT NULL,
  role          ENUM('admin','editor','member') NOT NULL DEFAULT 'member',
  lang          ENUM('fr','en','ar') NOT NULL DEFAULT 'fr',
  is_active     TINYINT(1) NOT NULL DEFAULT 1,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- team_members
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS team_members (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name   VARCHAR(120) NOT NULL,
  title_fr    VARCHAR(200),
  title_en    VARCHAR(200),
  bio_fr      TEXT,
  bio_en      TEXT,
  photo_path  VARCHAR(255),
  linkedin    VARCHAR(255),
  sort_order  TINYINT UNSIGNED NOT NULL DEFAULT 0,
  is_active   TINYINT(1) NOT NULL DEFAULT 1,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- statistics  (impact dashboard numbers)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS statistics (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  stat_key    VARCHAR(80) NOT NULL UNIQUE,
  value       INT UNSIGNED NOT NULL DEFAULT 0,
  label_fr    VARCHAR(120),
  label_en    VARCHAR(120),
  icon        VARCHAR(60),
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- opportunities
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS opportunities (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title_fr      VARCHAR(255) NOT NULL,
  title_en      VARCHAR(255),
  body_fr       TEXT,
  body_en       TEXT,
  category      ENUM('bourse','emploi','formation','appel_a_projets','conference') NOT NULL,
  deadline      DATE,
  external_url  VARCHAR(500),
  is_published  TINYINT(1) NOT NULL DEFAULT 0,
  created_by    INT UNSIGNED,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- documents  (resources library)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS documents (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title_fr      VARCHAR(255) NOT NULL,
  title_en      VARCHAR(255),
  description_fr TEXT,
  description_en TEXT,
  file_path     VARCHAR(500) NOT NULL,
  category      VARCHAR(80),
  is_public     TINYINT(1) NOT NULL DEFAULT 1,
  downloads     INT UNSIGNED NOT NULL DEFAULT 0,
  created_by    INT UNSIGNED,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- newsletter_subscribers
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(191) NOT NULL UNIQUE,
  lang          ENUM('fr','en','ar') NOT NULL DEFAULT 'fr',
  is_confirmed  TINYINT(1) NOT NULL DEFAULT 0,
  confirm_token VARCHAR(64),
  subscribed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- quizzes
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS quizzes (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title_fr    VARCHAR(255) NOT NULL,
  title_en    VARCHAR(255),
  pillar      ENUM('pathways','academy','opportunity_hub','urgences') NOT NULL,
  is_active   TINYINT(1) NOT NULL DEFAULT 1,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- quiz_questions
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS quiz_questions (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quiz_id     INT UNSIGNED NOT NULL,
  question_fr TEXT NOT NULL,
  question_en TEXT,
  sort_order  TINYINT UNSIGNED NOT NULL DEFAULT 0,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- quiz_choices
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS quiz_choices (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  question_id  INT UNSIGNED NOT NULL,
  choice_fr    VARCHAR(255) NOT NULL,
  choice_en    VARCHAR(255),
  is_correct   TINYINT(1) NOT NULL DEFAULT 0,
  sort_order   TINYINT UNSIGNED NOT NULL DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------
-- quiz_results
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS quiz_results (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quiz_id     INT UNSIGNED NOT NULL,
  user_id     INT UNSIGNED,
  score       TINYINT UNSIGNED NOT NULL DEFAULT 0,
  total       TINYINT UNSIGNED NOT NULL DEFAULT 0,
  taken_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
