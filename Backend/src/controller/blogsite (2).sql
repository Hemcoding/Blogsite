-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2023 at 01:52 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blogsite`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `blog_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_destination` varchar(255) NOT NULL,
  `image_filename` varchar(255) NOT NULL,
  `publish_date` datetime NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `status` enum('YES','NO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`blog_id`, `title`, `description`, `image_destination`, `image_filename`, `publish_date`, `likes`, `dislikes`, `created_at`, `updated_at`, `user_id`, `category_id`, `status`) VALUES
(1, 'This is title 3', 'the quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dog', './src/uploads/blogs', '1694688219478-ss.png', '2023-09-14 16:13:39', 0, 0, '2023-09-14 10:43:39', '0000-00-00 00:00:00', 7, 19, 'YES'),
(2, 'This is title 1', 'the quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dog', './src/uploads/blogs', '1694691285253-ss.png', '2023-09-14 17:04:45', 0, 0, '2023-09-14 11:34:45', '0000-00-00 00:00:00', 7, 19, 'YES'),
(3, 'This is title 2', 'the quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dog', './src/uploads/blogs', '1694691293588-ss.png', '2023-09-14 17:04:53', 0, 0, '2023-09-14 11:34:53', '0000-00-00 00:00:00', 7, 19, 'YES'),
(4, 'This is title 4', 'the quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dog', './src/uploads/blogs', '1694691298775-ss.png', '2023-09-14 17:04:58', 0, 0, '2023-09-14 11:34:58', '0000-00-00 00:00:00', 7, 19, 'YES'),
(5, 'This is title 5', 'the quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dogthe quick brown fox jumped over the lazy dog', './src/uploads/blogs', '1694691355644-ss.png', '2023-09-14 17:05:55', 0, 0, '2023-09-14 11:35:55', '0000-00-00 00:00:00', 7, 19, 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` enum('YES','NO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Technology', '2023-09-11 06:23:21', '0000-00-00 00:00:00', 'YES'),
(2, 'Travel', '2023-09-11 06:23:31', '0000-00-00 00:00:00', 'YES'),
(3, 'Food and Cooking', '2023-09-11 06:24:01', '0000-00-00 00:00:00', 'YES'),
(4, 'Health and Fitness', '2023-09-11 06:24:24', '0000-00-00 00:00:00', 'YES'),
(5, 'Lifestyle', '2023-09-11 06:24:35', '0000-00-00 00:00:00', 'YES'),
(6, 'Fashion', '2023-09-11 06:24:47', '0000-00-00 00:00:00', 'YES'),
(7, 'DIY and Crafts', '2023-09-11 06:24:56', '0000-00-00 00:00:00', 'YES'),
(8, 'Personal Development', '2023-09-11 06:25:38', '0000-00-00 00:00:00', 'YES'),
(9, 'Business and Finance', '2023-09-11 06:25:52', '0000-00-00 00:00:00', 'YES'),
(10, 'Home and Interior Design', '2023-09-11 06:26:02', '0000-00-00 00:00:00', 'YES'),
(11, 'Parenting and Family', '2023-09-11 06:26:12', '0000-00-00 00:00:00', 'YES'),
(12, 'Science', '2023-09-11 06:26:25', '0000-00-00 00:00:00', 'YES'),
(13, 'Entertainment', '2023-09-11 06:26:34', '0000-00-00 00:00:00', 'YES'),
(14, 'Sports and Fitness', '2023-09-11 06:26:46', '0000-00-00 00:00:00', 'YES'),
(15, 'Books and Literature', '2023-09-11 06:26:57', '0000-00-00 00:00:00', 'YES'),
(16, 'Music', '2023-09-11 06:27:07', '0000-00-00 00:00:00', 'YES'),
(17, 'Art and Creativity', '2023-09-11 06:27:16', '0000-00-00 00:00:00', 'YES'),
(18, 'Education', '2023-09-11 06:27:26', '0000-00-00 00:00:00', 'YES'),
(19, 'Environment and Sustainability', '2023-09-11 06:27:37', '0000-00-00 00:00:00', 'YES'),
(20, 'Inspirational and Motivational', '2023-09-11 06:27:49', '0000-00-00 00:00:00', 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `username` varchar(255) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `is_deletable` enum('YES','NO') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `comment`, `username`, `blog_id`, `is_deletable`, `created_at`, `updated_at`) VALUES
(1, 'this is very good blog 1', 'dhruv', 1, 'YES', '2023-09-14 10:20:10', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` enum('YES','NO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `name`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Author', '2023-09-08 11:12:40', '0000-00-00 00:00:00', 'NO'),
(2, 'Reader', '2023-09-11 04:55:14', '0000-00-00 00:00:00', 'NO');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_no` varchar(13) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `status` enum('YES','NO') NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `first_name`, `last_name`, `email`, `mobile_no`, `created_at`, `updated_at`, `status`, `role_id`) VALUES
(1, 'rahul', '$2b$15$O6/NX63HY/38ROgsgx/m2uFzK.B9RMJaeniHtDdbNbiKGx2u0pUEW', 'Rahul', 'Gusai', 'rahul@gmail.com', '+916353849567', '2023-09-13 07:44:01', '0000-00-00 00:00:00', 'NO', 1),
(2, 'himanshu', '$2b$15$E9L5LzdUTeUnortw2.KQde4MmJac1q9ftsFcre0aWZgdlYoURDcpq', 'Hemanshu', 'Parmar', 'hjparmar@gmail.com', '+919988776655', '2023-09-13 11:53:14', '0000-00-00 00:00:00', 'NO', 2),
(3, 'pyadav', '$2b$15$LVLApUtp0UAcsMrkyKhG...KSYWlPZFSFedfb6HfBLfNMMmIjjNUq', 'Pramod', 'Yadav', 'pramod@gmail.com', '+916359021267', '2023-09-13 11:55:25', '0000-00-00 00:00:00', 'NO', 2),
(4, 'oyadav', '$2b$15$HdpzHTrxAUQ8pVABuyWhLejVhB2yVFOtVswbPJ3Eig.SPFSdmQYhG', 'Om', 'Yadav', 'om@gmail.com', '+916359021267', '2023-09-13 11:56:36', '0000-00-00 00:00:00', 'NO', 2),
(5, 'omyadav', '$2b$15$zvOFuJ.xdSNBL2LsdLtkP.vEg0PSlv0WdIx0Mrw9MxofRrd86FezS', 'Om', 'Shah', 'omshah@gmail.com', '+916359021267', '2023-09-13 11:58:42', '0000-00-00 00:00:00', 'NO', 2),
(6, 'mgor', '$2b$15$AzmTUkwL4G.OeOnsaFszj.iyZoLlmHCW6vWqvpNebZ6pN2bW./Z6e', 'Mnatra', 'Gor', 'mantragor@gmail.com', '+916359021267', '2023-09-13 12:02:02', '0000-00-00 00:00:00', 'NO', 2),
(7, 'dhruv', '$2b$15$0Zz7yvjEtA4Q42bwitvONevs1T0.lT.igBWK1QXQ1T30o7qYULeUK', 'Dhruv', 'Tanna', 'dhruv@gmail.com', '+911234567890', '2023-09-14 04:31:22', '0000-00-00 00:00:00', 'NO', 2),
(8, 'rahul97', '$2b$15$ZsPLRKC7Pt6b2cqQdojwsuH7ym/oedZiDk7CVKQbDLfTOGi9QiDui', 'Rahul', 'Gusai', 'rahul97@gmail.com', '+911234567890', '2023-09-14 05:01:16', '0000-00-00 00:00:00', 'NO', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`blog_id`),
  ADD KEY `fk_user_id` (`user_id`),
  ADD KEY `fk_category_id` (`category_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
