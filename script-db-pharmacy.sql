-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 24, 2019 at 12:45 AM
-- Server version: 5.6.38
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `pharmacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `expiration_date` date NOT NULL,
  `unit_price` int(11) NOT NULL,
  `id_provider` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`id`, `name`, `expiration_date`, `unit_price`, `id_provider`, `quantity`) VALUES
(2, 'Parasphane', '2019-12-31', 14, 5, 75),
(3, 'Tarantan', '2019-12-25', 134, 5, 25),
(10, 'Doliprane', '2020-01-22', 30, 5, 37),
(11, 'Aspegic', '2020-12-31', 20, 5, 18),
(12, 'Aspegic', '2020-12-31', 20, 5, 9),
(13, 'paracetamole', '2019-12-31', 14, 5, 19),
(14, 'paracetamole', '2019-12-31', 14, 5, 8),
(18, 'dwa diali', '2019-12-24', 1, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `providers`
--

CREATE TABLE `providers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `contract_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `providers`
--

INSERT INTO `providers` (`id`, `name`, `city`, `contract_date`) VALUES
(5, 'Provider 4', 'Tétouan', '2019-12-05'),
(6, 'provider 2', 'Tanger', '2019-12-24');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `type` varchar(10) NOT NULL COMMENT 'sell or buy',
  `date` date NOT NULL,
  `id_medicine` int(11) NOT NULL,
  `id_provider` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `type`, `date`, `id_medicine`, `id_provider`, `id_user`, `quantity`) VALUES
(28, 'buy', '2019-12-20', 2, 5, 3, 6),
(29, 'buy', '2019-12-20', 2, 5, 3, 2),
(30, 'buy', '2019-12-20', 3, 5, 3, 3),
(31, 'buy', '2019-12-20', 2, 5, 3, 1),
(32, 'buy', '2019-12-20', 3, 5, 3, 1),
(33, 'buy', '2019-12-20', 2, 5, 3, 1),
(34, 'buy', '2019-12-20', 2, 5, 3, 1),
(35, 'buy', '2019-12-20', 2, 5, 3, 1),
(36, 'buy', '2019-12-20', 2, 5, 3, 1),
(37, 'buy', '2019-12-20', 2, 5, 3, 1),
(38, 'buy', '2019-12-20', 2, 5, 3, 1),
(39, 'buy', '2019-12-21', 2, 5, 3, 1),
(40, 'buy', '2019-12-21', 3, 5, 3, 1),
(41, 'buy', '2019-12-21', 2, 5, 3, 4),
(42, 'buy', '2019-12-21', 2, 5, 3, 39),
(43, 'buy', '2019-12-21', 2, 5, 3, 1),
(44, 'buy', '2019-12-21', 2, 5, 3, 10),
(45, 'buy', '2019-12-21', 2, 5, 3, 2),
(46, 'buy', '2019-12-21', 2, 5, 3, 10),
(47, 'buy', '2019-12-21', 2, 5, 3, 4),
(48, 'buy', '2019-12-21', 2, 5, 3, 1),
(49, 'buy', '2019-12-21', 2, 5, 3, 1),
(50, 'buy', '2019-12-21', 2, 5, 3, 1),
(51, 'buy', '2019-12-21', 2, 5, 3, 1),
(52, 'buy', '2019-12-21', 2, 5, 3, 1),
(53, 'buy', '2019-12-21', 2, 5, 3, 1),
(54, 'buy', '2019-12-21', 2, 5, 3, 1),
(55, 'buy', '2019-12-21', 10, 5, 3, 1),
(56, 'buy', '2019-12-21', 10, 5, 3, 1),
(57, 'buy', '2019-12-21', 10, 5, 3, 1),
(58, 'buy', '2019-12-21', 10, 5, 3, 1),
(59, 'buy', '2019-12-21', 3, 5, 3, 1),
(60, 'buy', '2019-12-21', 2, 5, 3, 2),
(61, 'buy', '2019-12-21', 10, 5, 3, 2),
(62, 'buy', '2019-12-21', 3, 5, 3, 2),
(63, 'buy', '2019-12-21', 10, 5, 3, 1),
(64, 'buy', '2019-12-21', 2, 5, 3, 1),
(65, 'buy', '2019-12-21', 3, 5, 3, 1),
(66, 'buy', '2019-12-21', 10, 5, 3, 1),
(67, 'buy', '2019-12-21', 2, 5, 3, 1),
(68, 'buy', '2019-12-21', 2, 5, 3, 1),
(69, 'buy', '2019-12-21', 2, 5, 3, 1),
(70, 'buy', '2019-12-21', 2, 5, 3, 1),
(71, 'buy', '2019-12-21', 2, 5, 3, 1),
(72, 'buy', '2019-12-21', 2, 5, 3, 1),
(73, 'buy', '2019-12-21', 2, 5, 3, 1),
(74, 'buy', '2019-12-21', 2, 5, 3, 1),
(75, 'buy', '2019-12-21', 10, 5, 3, 1),
(76, 'buy', '2019-12-21', 2, 5, 3, 1),
(77, 'buy', '2019-12-21', 2, 5, 3, 1),
(78, 'buy', '2019-12-21', 2, 5, 3, 1),
(79, 'buy', '2019-12-21', 2, 5, 3, 1),
(80, 'buy', '2019-12-23', 2, 5, 3, 14),
(81, 'buy', '2019-12-23', 10, 5, 3, 10),
(82, 'buy', '2019-12-23', 2, 5, 3, 2),
(83, 'buy', '2019-12-23', 3, 5, 3, 1),
(84, 'buy', '2019-12-23', 2, 5, 3, 1),
(85, 'buy', '2019-12-23', 2, 5, 3, 1),
(86, 'buy', '2019-12-23', 2, 5, 3, 1),
(87, 'buy', '2019-12-23', 2, 5, 3, 6),
(88, 'buy', '2019-12-23', 3, 5, 3, 5),
(89, 'buy', '2019-12-23', 11, 5, 3, 18),
(90, 'buy', '2019-12-23', 12, 5, 3, 9),
(91, 'buy', '2019-12-23', 13, 5, 3, 17),
(92, 'buy', '2019-12-23', 14, 5, 3, 6),
(93, 'buy', '2019-12-23', 2, 5, 3, 1),
(94, 'sell', '2019-12-23', 2, 5, 3, 1),
(95, 'sell', '2019-12-23', 2, 5, 3, 10),
(96, 'sell', '2019-12-23', 2, 5, 3, 1),
(97, 'sell', '2019-12-23', 2, 5, 3, 1),
(98, 'sell', '2019-12-24', 2, 5, 3, 50);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL COMMENT 'admin or null',
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `cin` varchar(50) DEFAULT NULL,
  `phone` varchar(30) NOT NULL,
  `description` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `type`, `first_name`, `last_name`, `cin`, `phone`, `description`) VALUES
(2, 'ouafae', 'ouafae', NULL, 'ouafae', 'chennoufi', 'GM171717', '987898', 'lefgzgv'),
(3, 'mehdi', 'mehdi', NULL, 'mehdi', 'chaouiiii', 'GM141414', '068442424', 'a good man a good man a good man a good man a good man a good man');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `id_provider` (`id_provider`);

--
-- Indexes for table `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_medicine` (`id_medicine`),
  ADD KEY `fk_provider` (`id_provider`),
  ADD KEY `fk_user` (`id_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `providers`
--
ALTER TABLE `providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medicines`
--
ALTER TABLE `medicines`
  ADD CONSTRAINT `medicines_ibfk_1` FOREIGN KEY (`id_provider`) REFERENCES `providers` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `fk_medicine` FOREIGN KEY (`id_medicine`) REFERENCES `medicines` (`id`),
  ADD CONSTRAINT `fk_provider` FOREIGN KEY (`id_provider`) REFERENCES `providers` (`id`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
