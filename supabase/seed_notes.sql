-- notes
create table
  public.notes (
    id uuid default uuid_generate_v4 (),
    created_at timestamp with time zone null default current_timestamp,
    updated_at timestamp with time zone null default current_timestamp,
    note text null,
    constraint notes_pkey primary key (id)
  ) tablespace pg_default;

insert into
  public.notes ( note)
values
  (
    'Started working on login functionality'
  ),
  (
    'Implemented user registration feature'
  ),
  (
    'Fixed bug in password reset functionality'
  ),
  (
    'Optimized database queries for better performance'
  ),
  (
    'Added validation for input fields'
  ),
  (
    'Implemented user profile page'
  ),
  (
    'Fixed styling issues in navigation bar'
  ),
  (
    'Added pagination to user list page'
  ),
  (
    'Refactored code for better code organization'
  ),
  (
    'Implemented file upload functionality'
  ),
  (
    'Fixed issue with email notifications'
  ),
  (
    'Added unit tests for authentication module'
  ),
  (
    'Optimized CSS and JS files for faster loading'
  ),
  (
    'Implemented search functionality for user list'
  ),
  (
    'Fixed issue with session management'
  ),
  (
    'Added error handling for database connection failures'
  ),
  (
    'Implemented password strength validation'
  ),
  (
    'Fixed issue with user roles not being assigned correctly'
  ),
  (
    'Optimized image loading for better performance'
  ),
  (
    'Added logging for debugging purposes'
  );