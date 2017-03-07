-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 19 Février 2015 à 10:35
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `zone51`
--
CREATE DATABASE IF NOT EXISTS `zone51` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `zone51`;

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
-- Vider la table avant d'insérer `levels`
--

TRUNCATE TABLE `levels`;
--
-- Contenu de la table `levels`
--

INSERT INTO `levels` (`ID`, `NumeroLevel`, `NomLevel`) VALUES
(1, 1, 'Level 1'),
(2, 2, 'Level 2'),
(3, 3, 'Level 3'),
(4, 4, 'Level 4'),
(5, 5, 'Level 5'),
(6, 6, 'Level 6'),
(7, 7, 'Level 7'),
(8, 8, 'Level 8'),
(9, 9, 'Level 9'),
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
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Vider la table avant d'insérer `scores`
--

TRUNCATE TABLE `scores`;
-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Login` varchar(21) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Vider la table avant d'insérer `users`
--

TRUNCATE TABLE `users`;
--
-- Contenu de la table `users`
--

INSERT INTO `users` (`ID`, `Login`) VALUES
(1, 'Riri'),
(2, 'Fifi'),
(3, 'dam'),
(4, 'Damien'),
(5, 'lol'),
(6, 'te'),
(7, 'dqsdfq'),
(8, 'D'),
(9, 'Da'),
(10, 'R');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
