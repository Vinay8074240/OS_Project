USE campus_security;
INSERT INTO students (
    id, 
    full_name, 
    roll_number, 
    year, 
    branch, 
    section, 
    phone, 
    email, 
    parent_guardian_phone, 
    dl_number, 
    created_at
) 
VALUES (
    'STU-001',             -- Manual ID for easy testing, or use UUID()
    'Rahul Sharma',        -- Student Name
    '2201A0501',           -- Unique Roll Number
    '3rd Year',            -- Year
    'CSE',                 -- Branch
    'A',                   -- Section
    '9876543210',          -- Student Phone
    'rahul.2201@vnrvjiet.in', -- Unique Email
    '9123456789',          -- Parent Phone (for Team 9's escalation)
    'TS0092024001',        -- Unique Driving License Number
    NOW()                  -- Current Timestamp
);
INSERT INTO vehicles (
    id, 
    student_id, 
    faculty_id, 
    plate_number, 
    vehicle_type, 
    status, 
    offense_count, 
    created_at
) 
VALUES (
    UUID(),                -- Generates a unique ID automatically
    'STU-001',             -- Must exist in the students table
    NULL,                  -- Faculty ID is NULL because it's a student
    'TS09-EB-1234',        -- The Number Plate
    'Two-Wheeler',         -- Type
    'approved',            -- Status
    0,                     -- Starting with 0 violations
    NOW()                  -- Sets the current date and time
);
SELECT id, plate_number FROM vehicles;
INSERT INTO violations (
    vehicle_id, 
    violation_type, 
    description, 
    fine_amount, 
    fine_status, 
    warning_issued, 
    created_at
) 
VALUES (
    '17f58884-2b70-11f1-8363-00155de86024', 
    'Overspeeding', 
    'Detected at 55km/h in a 20km/h zone near Hostel Block', 
    500.00, 
    'pending', 
    FALSE, 
    NOW()
);
Select *from violations;


-- 1. CLEANUP (Optional: Only if you want to start fresh)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE violations;
TRUNCATE TABLE vehicles;
TRUNCATE TABLE students;
SET FOREIGN_KEY_CHECKS = 1;

-- 2. CREATE THE USER
INSERT INTO students (id, full_name, roll_number, year, branch, section, phone, email, dl_number)
VALUES ('TEST-STU-01', 'John Doe', '2201A0599', '3rd', 'CSE', 'B', '9988776655', 'john@vnrvjiet.in', 'DL-TEST-01');

-- 3. CREATE THE VEHICLE WITH 3 EXISTING OFFENSES
-- We set offense_count to 3 so the NEXT one (the 4th) triggers the 500 fine logic.
INSERT INTO vehicles (id, student_id, plate_number, vehicle_type, status, offense_count)
VALUES ('TEST-VHC-01', 'TEST-STU-01', 'TS-09-CB-9999', 'Two-Wheeler', 'approved', 3);

-- 4. INSERT 3 OLD WARNINGS (So the history looks real)
INSERT INTO violations (vehicle_id, violation_type, description, fine_amount, fine_status, warning_issued)
VALUES 
('TEST-VHC-01', 'Overspeeding', 'Warning 1: 30kmph', 0.00, 'waived', TRUE),
('TEST-VHC-01', 'Overspeeding', 'Warning 2: 35kmph', 0.00, 'waived', TRUE),
('TEST-VHC-01', 'Overspeeding', 'Warning 3: 28kmph', 0.00, 'waived', TRUE);

INSERT INTO violations (vehicle_id, violation_type, description, fine_amount, fine_status, warning_issued)
VALUES ('TEST-VHC-01', 'Overspeeding', '4th offense: High Speed', 500.00, 'pending', FALSE);

-- Also update the vehicle's count so the system stays in sync
UPDATE vehicles SET offense_count = 4 WHERE id = 'TEST-VHC-01';