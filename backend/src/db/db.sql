-- creating owner table
create table Owners(
    id serial primary key,
    fullName varchar(255)not null,
    username varchar(255) not null unique,
    email varchar(255) not null unique check (email ~* '^[A-Za-z0-9_%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone_no char(10) check (phone_no ~ '^[0-9]{10}$') not null unique,
    password text not null,
    createdAt timestamp default current_timestamp,
    refreshToken text
);


-- creating user table
create table Users(
    id serial primary key,
    fullName varchar(255)not null,
    username varchar(255) not null unique,
    email varchar(255) not null unique check (email ~* '^[A-Za-z0-9_%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone_no char(10) check (phone_no ~ '^[0-9]{10}$') not null unique,
    password text not null,
    createdAt timestamp default current_timestamp,
    refreshToken text
);

-- creating Turf table
create table Turfs(
    id serial primary key,
	name text not null,
    location text not null,
    price decimal(6,2) not null,
    owner_id int,
    foreign key (owner_id) references Owners(id) on delete cascade,
	isAvailable boolean default true,
    images_urls text[],
    createdAt timestamp default current_timestamp
);

-- creating table reviews
create table Reviews (
    id serial primary key,
    user_id int,
    turf_id int,
    rating int check (rating >= 1 and rating <= 5) not null,
    comment text,
    createdAt timestamp default current_timestamp,
    foreign key (user_id) references Users(id),
    foreign key (turf_id) references Turfs(id)
);
-- creating bookings table
CREATE TABLE IF NOT EXISTS public.bookings
(
    id serial primary key,
    turf_id integer,
    user_id integer,
    booking_date date NOT NULL,
    timeslot varchar(5) check (timeslot::text ~ '^[0-9]{1,2}+-+[0-9]{1,2}'),
    foreign key (turf_id) references Turfs(id) on delete cascade,
    foreign key (user_id) references Users(id) on delete cascade,
)