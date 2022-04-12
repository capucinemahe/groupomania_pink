-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: database_development_groupomania
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Users_id` int DEFAULT NULL,
  `Posts_id` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Users_id` (`Users_id`),
  KEY `Posts_id` (`Posts_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`Posts_id`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (57,1,44,'merci <3\n','2022-02-10 08:36:07','2022-02-10 08:36:07');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Users_id` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Users_id` (`Users_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (42,1,'Hello tout le monde ! bon courage pour la semaine',NULL,'2022-02-10 08:10:22','2022-02-10 08:10:22'),(43,1,'salut !','cristina-cerda-e5EioBQmH8c-unsplash1644480884459.jpg','2022-02-10 08:14:44','2022-02-10 08:14:44'),(44,2,'Bonne semaine et surtout courage au service Web ;)',NULL,'2022-02-10 08:15:25','2022-02-10 08:15:25');
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20211227144448-create-users.js'),('20211227144513-create-posts.js'),('20211227144537-create-comments.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `imageuser` varchar(255) NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318008_960_720.png',
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'cap@test.com','$2b$10$wE/6GVWWHZi0fXquSfcYy.0glnLQmTWVXLTSOOYD8/XkeAcnLH6Na','Capucine','Mahé','Hello je travaille au service web !','http://localhost:8080/images/users/avatar.JPG1644085298535.jpg',0,'2022-02-01 17:19:11','2022-02-07 14:42:06'),(2,'paul@test.com','$2b$10$kIG.i0gZp9sY1eXpPhUADuD6/RER84M95o3SrEiXGx.HHnJdVlBdS','Paul','Saz','Je suis Paul !','http://localhost:8080/images/users/IMG_9961.jpg1644141762920.jpg',0,'2022-02-01 17:43:52','2022-02-06 10:02:42'),(8,'anna@test.com','$2b$10$XME6b3q2iVmmYnrLp.zF5uOc0Wo2VvXkMI2JlQEQqUUvx/nZNbUa6','Anna','Toueg','Votre biographie','https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318008_960_720.png',0,'2022-02-01 19:05:15','2022-02-01 19:05:15'),(9,'admin@test.com','$2b$10$8u0BvVgmF.3Fl1l3Tm0fxunyrHVMSy8z6IK2KCRStl6tb5V1PRgku','Administrateur','Groupomania','Je suis l\'administrateur','https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318008_960_720.png',1,'2022-02-01 19:09:11','2022-02-01 19:09:11');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-11 11:18:48
