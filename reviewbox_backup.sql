--
-- PostgreSQL database dump
--

\restrict 0mBgQVqDI7rrkrUKCi77ad4agG0kaCS5Qj5fejWKpOdTAj6KTX4JcN5AiRJbpRA

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    id integer NOT NULL,
    user_id integer NOT NULL,
    media_id integer NOT NULL,
    media_type character varying(30) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.favorites ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.favorites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer NOT NULL,
    media_id integer CONSTRAINT reviews_movie_id_not_null NOT NULL,
    rating integer NOT NULL,
    comment text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    media_type character varying(30)
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.reviews ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (id, user_id, media_id, media_type, created_at) FROM stdin;
1	4	969681	movies	2026-09-08 15:43:01.816341
31	1	969681	movies	2026-09-08 18:42:23.637141
33	8	1368337	movies	2026-09-10 23:17:37.998439
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, user_id, media_id, rating, comment, created_at, media_type) FROM stdin;
18	4	969681	4	fafdaf	2026-09-03 14:20:27.643135	movies
22	1	1204680	4	fdfda	2026-09-08 18:16:31.717278	movies
23	1	36109	4	dsaf	2026-09-10 22:48:21.027054	series
25	8	969681	3	dasda	2026-09-10 23:17:24.497647	movies
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password_hash, created_at) FROM stdin;
1	Dafne Sena	dafnesena222@gmail.com	$2b$10$opgrhq7vSnnYTzhwbDnSS.nsbfndPDDWw0J1HXwxdyi48EeLgN1/6	2026-08-25 19:04:49.933021
4	Nathan Ribeiro de Souza	nathanlrr5@gmail.com	$2b$10$j6xsT4WaXvOhVYzs0SYT6uofKof0Qpl8WzXMdzVZWKxk6rVkP1ceu	2026-08-26 11:25:57.368193
8	NewX               LeNCE$#@	newxlence@gmail.com	$2b$10$zmDKw5FujTzGtKaqi6ODXuFpKAh5d2uQzcNejGKFV5MDItXxnjboW	2026-09-10 23:07:08.248956
9	fdfdaffd	elthan82zx@gmail.co	$2b$10$XqVVdMzp.P5EP.NI5W2HfuKhJwWene5.ng2MPYkvRkm5e8DFa/2EW	2026-09-10 23:09:17.382635
11	a	elthanzx@gm	$2b$10$sC4Pd8sapn/nzg7h5VM4eObkGnUDaRMn321QjT.P5S.d7mNrehFbq	2026-09-10 23:10:21.101187
12	Dafne Sena	asa533@gmail	$2b$10$EtkDdSC8obV0i6wyJOdSzO62rEAnH872VaJdA/XJyR0Eaz5cPXW26	2026-09-10 23:11:43.614605
13	Dafne Sena	dafnesena22@gmail.co	$2b$10$f8vPjES9id.A05XQG7Jpvueci.B/EDjctDgjApeS40Hg8ZuK4H8WC	2026-09-11 11:52:14.445375
\.


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_id_seq', 33, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 25, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_user_id_media_id_media_type_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_media_id_media_type_key UNIQUE (user_id, media_id, media_type);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 0mBgQVqDI7rrkrUKCi77ad4agG0kaCS5Qj5fejWKpOdTAj6KTX4JcN5AiRJbpRA

