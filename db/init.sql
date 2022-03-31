CREATE TABLE IF NOT EXISTS offer
(
    id SERIAL,
    description character varying COLLATE pg_catalog."default",
    CONSTRAINT offer_pkey PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS "transaction"
(
    id SERIAL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    "offerId" integer NOT NULL,
    datetime timestamp with time zone DEFAULT now()
);


CREATE TABLE IF NOT EXISTS usertbl
(
    id SERIAL,
    email text COLLATE pg_catalog."default" NOT NULL,
    "offerTaken" integer DEFAULT 0,
    CONSTRAINT user_pkey PRIMARY KEY (email)
);