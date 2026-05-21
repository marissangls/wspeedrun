-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2026 at 09:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wspeedrun`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` varchar(36) NOT NULL,
  `run_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `run_id`, `user_id`, `comment`, `created_at`) VALUES
('2c677a87-7912-4d66-8887-1bfa8bd0a864', '0a018a0d-ca02-4c33-a0e8-930a1ca859db', 'e0ac164e-4e9e-4e81-8d92-edbd20a3e872', 'hebat', '2026-05-18 14:01:53');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` varchar(191) NOT NULL,
  `game_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `game_name`, `description`) VALUES
('c6ca432b-08e2-45fc-80b5-31ccc2bc7cf5', 'Genshin Impact', 'open world rpg game'),
('ffe8dd94-19e1-467e-a7fe-250588ff3f6d', 'Roblox', 'Roblox is the ultimate virtual universe that lets you create, share experiences with friends, and be anything you can imagine.');

-- --------------------------------------------------------

--
-- Table structure for table `runs`
--

CREATE TABLE `runs` (
  `run_id` varchar(36) NOT NULL,
  `run_category_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `vod_url` varchar(255) NOT NULL,
  `run_duration` bigint(20) NOT NULL,
  `submitted_at` datetime NOT NULL,
  `verified_at` datetime DEFAULT NULL,
  `status` varchar(25) NOT NULL DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `runs`
--

INSERT INTO `runs` (`run_id`, `run_category_id`, `user_id`, `vod_url`, `run_duration`, `submitted_at`, `verified_at`, `status`) VALUES
('4d339e40-038f-4d6e-9a08-0d8a3b3fec46', 'b681ab0e-2905-4b9a-b9ee-049bf6cb89af', 'f9fc8915-5673-4621-b38b-8d7a8b3c3f7d', 'dummylink222', 617, '2026-05-18 06:53:49', '2026-05-18 14:04:13', 'REJECTED'),
('ff270305-52cf-4e8b-befe-1fd3b4dce376', 'b681ab0e-2905-4b9a-b9ee-049bf6cb89af', 'f9fc8915-5673-4621-b38b-8d7a8b3c3f7d', 'dummylink', 304, '2026-05-18 06:53:35', NULL, 'PENDING');

-- --------------------------------------------------------

--
-- Table structure for table `run_categories`
--

CREATE TABLE `run_categories` (
  `run_category_id` varchar(191) NOT NULL,
  `game_id` varchar(36) NOT NULL,
  `run_category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `run_categories`
--

INSERT INTO `run_categories` (`run_category_id`, `game_id`, `run_category_name`) VALUES
('6290c0ea-fb33-4df4-972f-c0ae325cd314', 'c6ca432b-08e2-45fc-80b5-31ccc2bc7cf5', 'quest'),
('b681ab0e-2905-4b9a-b9ee-049bf6cb89af', 'c6ca432b-08e2-45fc-80b5-31ccc2bc7cf5', 'boss fight');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `username` varchar(55) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(55) NOT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `country`, `role`) VALUES
('0e6b725d-e3aa-44e7-9a42-d458b4cafe3e', 'kenny', 'kenny@mail.com', '$2b$10$ptw4VufMqGOTQg5.DfrBRuBUdxSTGShblJHLM1lL08JJLIY.mMdwe', 'indonesia', 'USER'),
('e0ac164e-4e9e-4e81-8d92-edbd20a3e872', 'risrisol', 'marissa@mail.com', '$2b$10$GvEncSuSgQWZJZv7yxdqA.UQU4LlXVVJCLVU9USxLJSorW0/XK3OW', 'indonesia', 'USER'),
('f9fc8915-5673-4621-b38b-8d7a8b3c3f7d', 'MelvinGoh', 'melvingoh@mail.com', '$2b$10$gFgpoW.2eGq28SLjX.EeEeTBTHJ1LwthgrHbkw1lzV7frJAPql1oq', 'indonesia', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `runs`
--
ALTER TABLE `runs`
  ADD PRIMARY KEY (`run_id`);

--
-- Indexes for table `run_categories`
--
ALTER TABLE `run_categories`
  ADD PRIMARY KEY (`run_category_id`),
  ADD KEY `run_categories_game_id_fkey` (`game_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `run_categories`
--
ALTER TABLE `run_categories`
  ADD CONSTRAINT `run_categories_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
