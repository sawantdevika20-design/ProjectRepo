-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2025 at 08:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs-login`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `Customer ID` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Phone_Number` varchar(10) NOT NULL,
  `HouseNo` int(10) NOT NULL,
  `Building_Name` text NOT NULL,
  `Street` text NOT NULL,
  `City` varchar(255) NOT NULL,
  `State` varchar(255) NOT NULL,
  `Pincode` int(10) NOT NULL,
  `Landmark` text NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`Customer ID`, `Name`, `Phone_Number`, `HouseNo`, `Building_Name`, `Street`, `City`, `State`, `Pincode`, `Landmark`, `Password`) VALUES
(4, '', '', 0, '', '', '', '', 0, '', '$2b$08$b.OgRndn2dQB.neSh27cqOQS5U17Vy0F4nPyUuGc7vsUJ7L4ewxfG'),
(5, 'DEVIKA', '7021486624', 3, 'BIT Chawl', 'Saint Mary Rd', 'Girgaon', 'Maharashtra', 421323, 'Fresh Juice Centre', '$2b$08$VK6Nzz41bQkJRzjztkCjZu/eQny1EoFlxCqA8Lqz25OgcfQIq3nrO'),
(6, 'Prathamesh', '7021199621', 2, 'BIT Chawl', 'Saint Mary Rd', 'Girgaon', 'maharashtra', 400010, 'csb', '$2b$08$bNRphQm3jBP9s7FVD1kwMenwZDWcsxUBkBMeRSUiwjlVcsmoEmBka'),
(7, 'Akshay', '7021199623', 2, 'Gurukrupa', 'darshan', 'Byculla', 'Maharashtra', 400010, 'Fresh Juice Centre', '$2b$08$Pq2DEpDhmEjC4up2Uag/fOBFdLG3/IeM5PwrRQddM2TcceXoubtBC'),
(8, 'Akshay', '7021199688', 2, 'Gurukrupa', 'darshan', 'Byculla', 'Maharashtra', 400010, 'Fresh Juice Centre', '$2b$08$knyez37JpQlWM4QoRL7XcupleDnfiWztXsCHYHx0GKJ5UfkELwSwi'),
(9, 'Pranit Shetge', '7021199789', 6, 'BIT Chawl', 'Saint Mary Rd', 'Byculla', 'Maharashtra', 400010, 'Icici bank', '$2b$08$svpJstraEBKsTgpEER/jmukzKP7iBxG9Ou16qCYy0tzRRcHj1hFri'),
(10, 'DEVIKA', '9356611099', 4, 'BIT Chawl', 'Saint Mary Rd', 'Girgaon', 'Maharashtra', 400010, 'Fresh Juice Centre', '$2b$08$zQ2qRkxfDPlDchM5aQfGoO3i9Eu5Bvs5uSz4bb3GhOQwB9UIDNUKW'),
(11, 'DEVIKA', '9356611890', 50, 'BIT Chawl', 'Saint Mary Rd', 'Byculla', 'Maharashtra', 400010, 'Icici bank', '$2b$08$WstmoyXBF.jKqLSVgnHaX.YysI77HS8WyiY9Cf4ENm6VBPWIw.Jua'),
(12, 'Dhanashree', '7021199123', 6, 'Keshavji Naik Chawl', 'Saint Mary Rd', 'Girgaon', 'Maharashtra', 400010, 'Icici bank', '$2b$08$4nY8Wqr98f37aSg7R.fw4..gsOD3O9d0e/ArmbyiNqXUivqMhIL5W'),
(13, 'DEVIKA', '9356611000', 9, 'BIT Chawl', 'Saint Mary Rd', 'Sion', 'Maharashtra', 400010, 'icici bank', '$2b$08$llT91R8f2b86ev12svtj/ekZdLGQSXANbYlkbq6wwMQv1afG0b/0.'),
(14, 'DEVIKA', '7021486999', 9, 'BIT Chawl', 'Saint Mary Rd', 'Byculla', 'Maharashtra', 400010, 'icici bank', '$2b$08$mr4e4bCRBcI6FoMdPDCMSOmP8hkSTfHJcnPeFkPtjpqU6NlvO6v0i'),
(15, 'Devika Salvi', '7021199622', 47, 'BIT Chawl', 'Saint Mary Rd', 'Byculla', 'Maharashtra', 400010, 'Icici bank', '$2b$08$nMdSDXOxIFhvY.rdAn0vT.1rdEKs5Cm1Dn6lTOooph7LIYKid2kLi'),
(16, 'Devika Salvi', '9937200199', 47, 'BIT Chawl', 'Saint Mary Rd', 'Byculla', 'Maharashtra', 400010, 'Icici bank', '$2b$08$n1QRbYYLit8rOW5RfyIEuucDpXzyd5s0NscrAQpiOWhanJA2F13AO'),
(17, 'Aanchal Dubey', '9373311097', 50, '7, BIT Chawl', 'Saint Mary Rd', 'Byculla', 'Maharashtra', 400010, 'icici bank', '$2b$08$//fGe33tsDCmrfHT3CsJ7eOfFHsxcNlwWRzhA5dp074VaXL3J/vh.'),
(18, 'Riddhima Surve', '7030414300', 6, 'Keshavji Naik Chawl', 'Keshavji Naik Rd', 'Girgaon', 'Maharashtra', 400010, 'Fresh Juice Centre', '$2b$08$uDN6AdSGw.YHOqBdWwGxFOimJVTIVZqdZo/l//Y8UHfwgjRZakOLG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`Customer ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `Customer ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
