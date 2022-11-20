-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Nov 2022 pada 11.01
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `leaflet_crud`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_categories`
--

CREATE TABLE `data_categories` (
  `id` int(11) NOT NULL,
  `category` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `data_categories`
--

INSERT INTO `data_categories` (`id`, `category`) VALUES
(1, 'Rumah Makan'),
(2, 'Rumah Sakit');

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_linestring`
--

CREATE TABLE `data_linestring` (
  `gid` int(11) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `geom` geometry NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `data_linestring`
--

INSERT INTO `data_linestring` (`gid`, `notes`, `geom`) VALUES
(1, 'JALANAN', 0xe6100000010200000002000000ce8e54dff9545b40faefc16b97369cbf6422a5d93c555b40d7be805eb873a1bf);

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_point`
--

CREATE TABLE `data_point` (
  `gid` int(11) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `geom` geometry NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `data_point`
--

INSERT INTO `data_point` (`gid`, `notes`, `geom`, `id_category`) VALUES
(7, 'CW', 0xe61000000101000000e8305f5e804f5b40a304fd851e319a3f, 1),
(8, 'RUMAH ALTAF', 0xe6100000010100000092cf2b9e7a515b40684128efe3689e3f, 2),
(9, 'RUMAH', 0xe610000001010000004f78094e7d535b40d3f544d7851f7c3f, 1),
(10, 'J', 0xe6100000010100000096766a2e37505b40b85a272ec72b703f, 1),
(11, 'JJJ', 0xe6100000010100000094f947dfa4505b40795dbf60376c8bbf, 2),
(12, 'HOOOO', 0xe61000000101000000f52b9d0fcf505b40aa7d3a1e3350593f, 2),
(13, 'ASD', 0xe610000001010000006953758f6c515b40b85a272ec72b703f, 1),
(14, 'ASD', 0xe610000001010000000a4b3ca06c505b40cdab3aab05f688bf, 1),
(15, 'AOKOKOK', 0xe6100000010100000008e3a7716f505b40afcc5b751daa993f, 1),
(16, 'ASDASD', 0xe61000000101000000d656ec2fbb535b40740987dee2e18d3f, 1),
(17, 'OKOK', 0xe61000000101000000fe7f9c3061535b40a629029cdec59b3f, 1),
(18, 'ASOK', 0xe61000000101000000d76b7a5050535b40973c9e961fb89a3f, 1),
(19, 'AS', 0xe610000001010000002864e76d6c535b4074232c2ae274923f, 1),
(20, 'AS', 0xe61000000101000000333509de90555b403b8a73d4d17185bf, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_polygon`
--

CREATE TABLE `data_polygon` (
  `gid` int(11) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `geom` geometry NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `data_polygon`
--

INSERT INTO `data_polygon` (`gid`, `notes`, `geom`) VALUES
(2, 'MITOS', 0xe610000001030000000100000005000000091b9e5e294c5b40aeb7cd548847aa3ffbe769c0204f5b40684128efe3689e3f13d731aeb84e5b40452dcdad1056933fcc41d0d1aa4b5b40384bc972124a9f3f091b9e5e294c5b40aeb7cd548847aa3f);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `data_categories`
--
ALTER TABLE `data_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `data_linestring`
--
ALTER TABLE `data_linestring`
  ADD PRIMARY KEY (`gid`);

--
-- Indeks untuk tabel `data_point`
--
ALTER TABLE `data_point`
  ADD PRIMARY KEY (`gid`),
  ADD KEY `fk_id_category` (`id_category`);

--
-- Indeks untuk tabel `data_polygon`
--
ALTER TABLE `data_polygon`
  ADD PRIMARY KEY (`gid`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `data_categories`
--
ALTER TABLE `data_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `data_linestring`
--
ALTER TABLE `data_linestring`
  MODIFY `gid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `data_point`
--
ALTER TABLE `data_point`
  MODIFY `gid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `data_polygon`
--
ALTER TABLE `data_polygon`
  MODIFY `gid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `data_point`
--
ALTER TABLE `data_point`
  ADD CONSTRAINT `fk_id_categoru` FOREIGN KEY (`id_category`) REFERENCES `data_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
