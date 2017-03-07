-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 20 Mars 2015 à 15:52
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `sokoban21`
--
CREATE DATABASE IF NOT EXISTS `sokoban21` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sokoban21`;

-- --------------------------------------------------------

--
-- Structure de la table `levels`
--

DROP TABLE IF EXISTS `levels`;
CREATE TABLE IF NOT EXISTS `levels` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NumeroLevel` int(11) NOT NULL,
  `NomLevel` varchar(21) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Contenu de la table `levels`
--

INSERT INTO `levels` (`ID`, `NumeroLevel`, `NomLevel`) VALUES
(1, 1, 'Level 01'),
(2, 2, 'Level 02'),
(3, 3, 'Level 03'),
(4, 4, 'Level 04'),
(5, 5, 'Level 05'),
(6, 6, 'Level 06'),
(7, 7, 'Level 07'),
(8, 8, 'Level 08'),
(9, 9, 'Level 09'),
(10, 10, 'Level 10'),
(11, 11, 'Level 11'),
(12, 12, 'Level 12'),
(13, 13, 'Level 13'),
(14, 14, 'Level 14'),
(15, 15, 'Level 15');

-- --------------------------------------------------------

--
-- Structure de la table `scores`
--

DROP TABLE IF EXISTS `scores`;
CREATE TABLE IF NOT EXISTS `scores` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDLevel` int(11) NOT NULL,
  `IDUser` int(11) NOT NULL,
  `HightScore` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `IDLevelUser` (`IDLevel`,`IDUser`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=40 ;

--
-- Contenu de la table `scores`
--

INSERT INTO `scores` (`ID`, `IDLevel`, `IDUser`, `HightScore`) VALUES
(1, 1, 4, 8),
(2, 2, 4, 7),
(3, 3, 4, 10),
(4, 4, 4, 10),
(5, 5, 4, 8),
(6, 6, 4, 10),
(8, 7, 4, 10),
(9, 8, 4, 10),
(10, 9, 4, 10),
(21, 10, 4, 10),
(24, 11, 4, 26),
(25, 12, 4, 26),
(26, 13, 4, 99),
(27, 14, 4, 126),
(28, 1, 23, 9),
(29, 2, 23, 10),
(30, 3, 23, 44),
(31, 4, 23, 45),
(32, 5, 23, 13),
(33, 6, 23, 2),
(34, 7, 23, 11),
(35, 8, 23, 7),
(36, 9, 23, 49),
(37, 10, 23, 45),
(38, 11, 23, 28),
(39, 12, 23, 25);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Login` varchar(21) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`ID`, `Login`) VALUES
(4, 'Damien');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
