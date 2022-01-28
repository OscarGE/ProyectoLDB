-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-12-2021 a las 23:04:33
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `crm_abarrotes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(10) NOT NULL,
  `category` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Alimentos'),
(2, 'Belleza'),
(3, 'Electrónicos'),
(4, 'Limpieza'),
(5, 'Mascotas'),
(6, 'Higiene Personal'),
(7, 'Medicamentos'),
(8, 'Desechables'),
(9, 'Regalos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) NOT NULL,
  `id_provider` int(10) NOT NULL,
  `type` varchar(20) NOT NULL,
  `contact` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`id`, `id_provider`, `type`, `contact`) VALUES
(5, 1, 'Teléfono', '8009102030'),
(6, 1, 'Teléfono', '8009104396'),
(7, 1, 'e-mail', 'provee@bimbo.com'),
(10, 2, 'Website', 'www.Bimbo.com'),
(11, 2, 'Twitter', 'www.twitter.com/bimbo'),
(12, 3, 'Teléfono', '5658653409'),
(13, 3, 'Instagram', 'www.instagram.com/grupoalen'),
(14, 4, 'Teléfono', '5497080534'),
(15, 4, 'Website', 'www.coca-cola.com'),
(16, 5, 'Facebook', 'www.facebook.com/grupobimbo'),
(17, 6, 'Teléfono', '5046701202'),
(18, 6, 'e-mail', 'provee@reyma.com'),
(19, 7, 'Teléfono', '6097090945'),
(20, 7, 'e-mail', 'provee@p&g.com'),
(21, 7, 'Website', 'www.Procter&Gamble.com'),
(22, 8, 'Teléfono', '8009019500'),
(23, 8, 'Website', 'www.Sabritas.com'),
(24, 8, 'Instagram', 'www.instagram.com/sabritas'),
(25, 9, 'Teléfono', '7890972334'),
(26, 9, 'e-mail', 'www.purina-latam.com'),
(27, 9, 'Teléfono', '7890970945');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_sales`
--

CREATE TABLE `info_sales` (
  `id_sales` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `id_product` int(10) NOT NULL,
  `id_provider` int(10) NOT NULL,
  `customer` varchar(100) NOT NULL,
  `amount` int(10) NOT NULL,
  `quantity` int(10) DEFAULT 0,
  `price` float NOT NULL,
  `sale_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `info_sales`
--

INSERT INTO `info_sales` (`id_sales`, `id_user`, `id_product`, `id_provider`, `customer`, `amount`, `quantity`, `price`, `sale_date`) VALUES
(38, 7, 12, 7, 'Oscar', 211, 3, 70.4, '2021-12-13 07:44:08'),
(38, 7, 9, 8, 'Oscar', 26, 2, 13, '2021-12-13 07:44:16'),
(39, 7, 5, 4, 'Carlos', 54, 2, 27, '2021-12-13 07:44:30'),
(39, 7, 8, 7, 'Carlos', 36, 1, 36, '2021-12-13 07:44:49'),
(40, 7, 9, 8, '', 13, 1, 13, '2021-12-13 07:44:56'),
(41, 7, 12, 7, '', 70, 1, 70.4, '2021-12-13 07:45:01'),
(38, 7, 7, 6, 'Oscar', 20, 1, 20, '2021-12-01 07:47:47'),
(39, 7, 8, 7, 'Carlos', 36, 1, 36, '2021-12-06 07:50:16'),
(42, 7, 10, 9, 'Marco', 648, 8, 81, '2021-12-13 18:17:30'),
(42, 7, 10, 9, 'Marco', 324, 4, 81, '2021-12-13 18:17:53'),
(42, 7, 10, 9, 'Marco', 243, 3, 81, '2021-12-13 18:19:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locations`
--

CREATE TABLE `locations` (
  `id` int(10) NOT NULL,
  `id_provider` int(10) NOT NULL,
  `country` varchar(40) NOT NULL,
  `state` varchar(40) NOT NULL,
  `city` varchar(40) NOT NULL,
  `postal` varchar(10) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `locations`
--

INSERT INTO `locations` (`id`, `id_provider`, `country`, `state`, `city`, `postal`, `address`) VALUES
(2, 1, 'México', 'Aguascalientes', 'Aguascalientes', '34765', 'Av José de Jesús González García, Villas de Ntra. Sra. de la Asunción #301'),
(3, 2, 'México', 'Aguascalientes', 'Aguascalientes', '20126', 'Av José de Jesús González García, Villas de Ntra. Sra. de la Asunción #301'),
(4, 3, 'México', 'Nuevo León', 'Monterrey', '64780', 'En HEB, Av. Eugenio Garza Sada 4321, Contry,'),
(5, 4, 'México', 'Aguascalientes', 'Aguascalientes', '20126', 'Av José de Jesús González García, Villas de Ntra. Sra. de la Asunción #301'),
(6, 5, 'México', 'Aguascalientes', 'Aguascalientes', '20126', 'Av José de Jesús González García, Villas de Ntra. Sra. de la Asunción #301'),
(7, 6, 'México', 'Sonora', 'Nogales', '84094', 'Calzada Industrial de la Manufactura No.35, Nueva Nogales.'),
(8, 7, 'Madagascar', 'Veracruz', 'Veracruz', '91700', 'C. Aquiles Serdán 732, Centro'),
(9, 8, 'México', 'Aguascalientes', 'Aguascalientes', '20290', 'Julio Díaz Torre 203, Cd Industrial'),
(10, 9, 'México', 'Jalisco', 'Guadalajara', '44940', 'Sombrerete 4425, El Manantial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL DEFAULT 0,
  `stock` int(10) NOT NULL DEFAULT 0,
  `id_provider` int(10) NOT NULL,
  `id_category` int(10) NOT NULL,
  `registered_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `id_user`, `name`, `description`, `price`, `stock`, `id_provider`, `id_category`, `registered_at`) VALUES
(1, 8, 'Medias noches ', 'Delicioso pan para hot dogs ideal para preparar antojos prácticos y deliciosos.', 20, 40, 1, 1, '2021-12-12 00:34:17'),
(2, 8, 'Pan integral mediano 480g', 'Pan Integral Bimbo está hecho con granos enteros de trigo.', 36, 15, 1, 1, '2021-12-12 00:35:45'),
(3, 5, 'Pan molido clásico', 'El favorito de la cocina, elaborado con trigo, ideal para darle un delicioso sabor a tus platillos, para que puedas multiplicar tus posibilidades en la cocina.', 20, 10, 2, 1, '2021-12-12 00:43:03'),
(4, 5, 'Pinol original 1 litro', 'PINOL es una marca con más de 60 años conquistando hogares mexicanos y brindando soluciones de limpieza a nuestras consumidoras.', 30, 10, 3, 4, '2021-12-12 00:59:41'),
(5, 7, 'Coca-Cola Sin Azúcar 3 L', 'Botella de refresco coca-cola sin azúcar ', 27, 16, 4, 1, '2021-12-12 01:39:05'),
(7, 7, 'Vasos de prolipropileno', 'deal para todo tipo de reuniones gracias a su capacidad y resistencia. Con su variedad de tamaños, se adaptan a tus necesidades.', 20, 0, 6, 8, '2021-12-12 01:43:44'),
(8, 7, 'Ariel Doble Poder Polvo 500 kg', 'Ariel Doble Poder es un detergente en polvo para lavar ropa blanca y de color.', 36, 17, 7, 4, '2021-12-12 01:45:37'),
(9, 7, 'Ruffles', 'Bolsa de papas sabor queso ', 20, 32, 8, 1, '2021-12-12 01:48:09'),
(10, 7, 'Dog Chow EXTRA Life', 'Alimento Para Perro Adulto Nutriplus 18 kg', 81, 33, 9, 5, '2021-12-12 01:51:34'),
(11, 7, 'Crest complete menta suave 50 ml', 'Pasta dental Crest. Ayuda a detener las caries con la pasta dental Crest complete, que además de darte una higiene bucal completa, te ayuda a eliminar bacterias en cada cepillado de dientes , gracias a su sistema activprotec.', 17, 0, 7, 6, '2021-12-12 16:04:13'),
(12, 7, 'Head & Houlders protección caída con caída 600ml', 'Protección Caída con Cafeína refuerza el cabello desde la raíz para evitar el quiebre.', 70.4, 23, 7, 6, '2021-12-13 03:02:59'),
(13, 7, 'Bran Frut fresa', 'Barra', 15, 0, 5, 1, '2021-12-13 18:14:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `providers`
--

CREATE TABLE `providers` (
  `id` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` text NOT NULL,
  `registered_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `providers`
--

INSERT INTO `providers` (`id`, `id_user`, `name`, `description`, `registered_at`) VALUES
(1, 8, 'Grupo Bimbo', 'Grupo Bimbo, S.A.B. de C.V. es una empresa multinacional mexicana​ que tiene presencia en 33 países de América, Europa, Asia y África​ y cuenta con un volumen de ventas anuales de 15 mil millones de dólares.', '2021-12-12 00:29:51'),
(2, 5, 'Grupo Bimbo', 'Grupo Bimbo, S.A.B. de C.V. es una empresa multinacional mexicana​ que tiene presencia en 33 países de América, Europa, Asia y África​ y cuenta con un volumen de ventas anuales de 15 mil millones de dólares.', '2021-12-12 00:40:50'),
(3, 5, 'Grupo ALEn', 'Creamos productos y materias primas con un enfoque sustentable.', '2021-12-12 00:44:32'),
(4, 7, 'Coca-Cola', 'The Coca-Cola Company es una corporación multinacional estadounidense de bebidas con sede en Atlanta, Georgia. ', '2021-12-12 01:23:44'),
(5, 7, 'Grupo Bimbo', 'Grupo Bimbo, S.A.B. de C.V. es una empresa multinacional mexicana​ que tiene presencia en 33 países de América, Europa, Asia y África​ y cuenta con un volumen de ventas anuales de 15 mil millones de dólares.', '2021-12-12 01:24:30'),
(6, 7, 'REYMA', 'Desarrollamos tecnología que nos permita elaborar productos desechables amigables con el medio ambiente y con la capacidad de ser recuperados energéticamente. ', '2021-12-12 01:26:33'),
(7, 7, 'Procter & Gamble', 'Procter & Gamble también conocida como P&G es una empresa estadounidense multinacional de bienes de consumo con sede en Cincinnati, Estados Unidos.', '2021-12-12 01:28:20'),
(8, 7, 'Sabritas', 'Sabritas es una empresa subsidiaria de PepsiCo. Sabritas es la versión mexicana de Frito-Lay, por lo que son similares en imagen y en los productos que distribuyen.', '2021-12-12 01:30:13'),
(9, 7, 'Purina', 'Purina Petcare Company es la división de alimentos para mascotas de Nestlé, con sede en Suiza, tras la fusión el 12 de diciembre de 2001, entre el Friskies Nestlé Petcare Company y la estadounidense Ralston Purina Company.', '2021-12-12 01:36:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(10) NOT NULL,
  `id_user` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `id_user`) VALUES
(38, 7),
(39, 7),
(40, 7),
(41, 7),
(42, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `registered_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `registered_at`) VALUES
(5, 'marco@gmail.com', '$2a$08$mJnFBKNboJRhbpzIiKB.ZeRnAKfsGUT/ie3Sa7qeeS5Zb7BebYmty', '2021-12-11 21:24:20'),
(6, 'oscar@gmail.com', '$2a$08$7wqcEWxplnKGBclsctAff.M7pywbZmZXb.ZMXwmHLM7qBjHQeV/96', '2021-12-11 23:52:30'),
(7, 'david@gmail.com', '$2a$08$ILR3VyQjVMvMcheg4g5jOOLE.sfnqtmSu2SUwXe/YroMMK4aFYwMW', '2021-12-11 23:54:34'),
(8, 'ivan@gmail.com', '$2a$08$mlS0Fn3h5qQF2bL55yc.IeznmFbbZDRHoc0LB7InMGTBSKMPyx3Hu', '2021-12-12 00:03:23'),
(9, 'sort@gmail.com', '$2a$08$wcR5GhrydA7hKwhohDUyJuGJaqdvJboJ2q5gZYfdk5txf8EeD9SWK', '2021-12-13 02:51:43'),
(10, 'pedro@gmial.com', '$2a$08$WBB8Zur1bn4sK0yKRlLncu5XLHXcAXTM0cNik48Oie.anAurXX0fO', '2021-12-13 13:50:50'),
(11, 'carlos@gmail.com', '$2a$08$/KumCyx3crgFRNfhxOyHou6eCDV4JQx7ImdDgMd2brx15F/4Qs6Z2', '2021-12-13 18:07:40');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_provider` (`id_provider`);

--
-- Indices de la tabla `info_sales`
--
ALTER TABLE `info_sales`
  ADD KEY `id_sales` (`id_sales`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_provider` (`id_provider`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_provider` (`id_provider`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_provider` (`id_provider`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `providers`
--
ALTER TABLE `providers`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `fk_contacts_providers` FOREIGN KEY (`id_provider`) REFERENCES `providers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `info_sales`
--
ALTER TABLE `info_sales`
  ADD CONSTRAINT `fk_info_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fk_info_providers` FOREIGN KEY (`id_provider`) REFERENCES `providers` (`id`),
  ADD CONSTRAINT `fk_info_sales` FOREIGN KEY (`id_sales`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_info_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `fk_locations_providers` FOREIGN KEY (`id_provider`) REFERENCES `providers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_categories` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `fk_products_providers` FOREIGN KEY (`id_provider`) REFERENCES `providers` (`id`),
  ADD CONSTRAINT `fk_products_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `providers`
--
ALTER TABLE `providers`
  ADD CONSTRAINT `fk_providers_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `fk_sales_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
