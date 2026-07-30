# Create the database
CREATE DATABASE IF NOT EXISTS fittrack;
USE fittrack;


CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE  NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_Password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS exercises (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  muscle_group VARCHAR(50) NOT NULL,
  equipment VARCHAR(50) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS workouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  workout_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE (user_id, workout_name),
  FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workout_exercises (
  workout_id INT NOT NULL,
  exercise_id INT NOT NULL,
  set_count INT NOT NULL DEFAULT 3,
  rep_count INT NOT NULL DEFAULT 8,

  PRIMARY KEY (workout_id, exercise_id),
  FOREIGN KEY (workout_id) REFERENCES workouts(id)
      ON DELETE CASCADE,
  FOREIGN KEY (exercise_id) REFERENCES exercises(id)
      ON DELETE CASCADE
);

# Create the app user
CREATE USER IF NOT EXISTS 'fittrack_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON fittrack.* TO 'fittrack_app'@'localhost';