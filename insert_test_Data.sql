# Insert data into the tables
USE fittrack;

INSERT INTO exercises
(name, muscle_group, equipment, difficulty, description)
VALUES
(
  'Bench Press',
  'Chest',
  'Barbell',
  'Intermediate',
  'Lie on a bench and press the barbell upward until your arms are extended.'
),
(
  'Back Squat',
  'Legs',
  'Barbell',
  'Intermediate',
  'Place the barbell across your upper back, squat down, and return to standing.'
),
(
  'Deadlift',
  'Back',
  'Barbell',
  'Advanced',
  'Lift a barbell from the floor by extending the hips and knees while keeping the back controlled.'
),
(
  'Pull Up',
  'Back',
  'Bodyweight',
  'Intermediate',
  'Hang from a bar and pull your body upward until your chin passes the bar.'
),
(
  'Lat Pulldown',
  'Back',
  'Cable',
  'Beginner',
  'Pull the bar down towards the upper chest while keeping the torso controlled.'
),
(
  'Dumbbell Shoulder Press',
  'Shoulders',
  'Dumbbell',
  'Beginner',
  'Press two dumbbells overhead from shoulder height.'
),
(
  'Leg Press',
  'Legs',
  'Machine',
  'Beginner',
  'Push the platform away using the legs while keeping the lower back supported.'
),
(
  'Dumbbell Bicep Curl',
  'Arms',
  'Dumbbell',
  'Beginner',
  'Curl the dumbbells upward by bending the elbows without swinging the body.'
),
(
  'Tricep Pushdown',
  'Arms',
  'Cable',
  'Beginner',
  'Push the cable attachment downward by extending the elbows.'
),
(
  'Plank',
  'Core',
  'Bodyweight',
  'Beginner',
  'Hold the body in a straight line while supporting yourself on the forearms and toes.'
);
