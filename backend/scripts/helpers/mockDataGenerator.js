/**
 * Mock Data Generator Helper
 * Generates synthetic data for testing and development
 */

const bcrypt = require('bcryptjs');

// Sample data pools
const FIRST_NAMES = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa',
  'Timothy', 'Deborah', 'Ronald', 'Stephanie', 'Jason', 'Rebecca', 'Edward', 'Sharon'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor',
  'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Sanchez',
  'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
  'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams'
];

const SPECIALIZATIONS = [
  'General Practice', 'Cardiology', 'Pediatrics', 'Dermatology', 'Orthopedics',
  'Neurology', 'Psychiatry', 'Endocrinology', 'Gastroenterology', 'Pulmonology'
];

const ALLERGIES = [
  'Penicillin', 'Peanuts', 'Shellfish', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Tree Nuts',
  'Latex', 'Aspirin', 'Ibuprofen', 'Codeine', 'Sulfa Drugs', 'Dust Mites', 'Pollen'
];

const MEDICATIONS = [
  { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
  { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
  { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily' },
  { name: 'Levothyroxine', dosage: '75mcg', frequency: 'Once daily' },
  { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' },
  { name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily' },
  { name: 'Albuterol', dosage: '90mcg', frequency: 'As needed' },
  { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily' }
];

const CONDITIONS = [
  'Hypertension', 'Diabetes Type 2', 'Asthma', 'Arthritis', 'High Cholesterol',
  'Hypothyroidism', 'GERD', 'Anxiety', 'Depression', 'Migraine', 'Sleep Apnea',
  'Osteoporosis', 'COPD', 'Heart Disease', 'Kidney Disease'
];

const TEST_TYPES = [
  'Blood Pressure', 'Cholesterol', 'Blood Glucose', 'Complete Blood Count',
  'Lipid Panel', 'Thyroid Function', 'Liver Function', 'Kidney Function',
  'Mammogram', 'Colonoscopy', 'Pap Smear', 'Prostate Screening', 'Bone Density'
];

const IMMUNIZATIONS = [
  'Flu Shot', 'COVID-19 Vaccine', 'Tetanus', 'Hepatitis B', 'MMR', 'Varicella',
  'Pneumococcal', 'Shingles', 'HPV', 'Meningococcal'
];

const SYMPTOMS = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness', 'Chest Pain',
  'Shortness of Breath', 'Joint Pain', 'Muscle Aches', 'Sore Throat', 'Runny Nose',
  'Abdominal Pain', 'Back Pain', 'Insomnia', 'Anxiety', 'Rash', 'Swelling'
];

const ADVISORY_TEXTS = [
  'Please ensure you take your medication with food to avoid stomach upset.',
  'Remember to monitor your blood pressure daily and record the readings.',
  'It\'s important to stay hydrated, especially during hot weather.',
  'Consider increasing your daily physical activity gradually.',
  'Make sure to get at least 7-8 hours of sleep each night.',
  'Follow up with your next appointment in 3 months.',
  'Continue monitoring your blood sugar levels as discussed.',
  'Remember to take your vitamins with breakfast each morning.',
  'Avoid foods high in sodium to help manage your blood pressure.',
  'Keep a food diary to track any potential allergy triggers.'
];

const REMINDER_TEXTS = {
  medication: [
    'Take Metformin with breakfast',
    'Take your blood pressure medication',
    'Time for your daily vitamins',
    'Don\'t forget your evening medication',
    'Take your cholesterol medication'
  ],
  water: [
    'Drink a glass of water',
    'Stay hydrated - drink water',
    'Time for your water break',
    'Remember to drink water',
    'Hydration reminder'
  ]
};

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Pick a random element from an array
 */
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Pick multiple random elements from an array
 */
function randomChoices(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Generate a random date between start and end dates
 */
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

/**
 * Generate a random date in the past N days
 */
function randomPastDate(daysAgo) {
  const now = new Date();
  const past = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return randomDate(past, now);
}

/**
 * Generate a random email
 */
function generateEmail(firstName, lastName, index) {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'example.com'];
  const domain = randomChoice(domains);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@${domain}`;
}

/**
 * Generate a random phone number
 */
function generatePhone() {
  const area = randomInt(200, 999);
  const exchange = randomInt(200, 999);
  const number = randomInt(1000, 9999);
  return `${area}-${exchange}-${number}`;
}

/**
 * Generate a random date of birth (age between 18 and 80)
 */
function generateDOB() {
  const age = randomInt(18, 80);
  const now = new Date();
  const birthYear = now.getFullYear() - age;
  const birthMonth = randomInt(0, 11);
  const birthDay = randomInt(1, 28); // Use 28 to avoid month-end issues
  return new Date(birthYear, birthMonth, birthDay);
}

/**
 * Generate a random time in HH:MM format
 */
function generateTime() {
  const hour = randomInt(6, 22).toString().padStart(2, '0');
  const minute = randomInt(0, 59).toString().padStart(2, '0');
  return `${hour}:${minute}`;
}

/**
 * Generate synthetic user data
 */
function generateUser(role, index) {
  const firstName = randomChoice(FIRST_NAMES);
  const lastName = randomChoice(LAST_NAMES);
  const email = generateEmail(firstName, lastName, index);
  
  return {
    email,
    password: 'password123', // Will be hashed by User model
    role,
    name: `${firstName} ${lastName}`,
    consentGiven: true
  };
}

/**
 * Generate synthetic patient data
 */
function generatePatient(userId, providerId = null) {
  const dob = generateDOB();
  const sex = randomChoice(['male', 'female', 'other']);
  const bloodGroup = randomChoice(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
  
  // Generate allergies (0-3)
  const allergies = randomChoices(ALLERGIES, randomInt(0, 3));
  
  // Generate medications (0-3)
  const medications = randomChoices(MEDICATIONS, randomInt(0, 3));
  
  // Generate conditions (0-2)
  const conditions = randomChoices(CONDITIONS, randomInt(0, 2));
  
  // Generate last tests (1-4 tests in the past year)
  const lastTests = [];
  const testCount = randomInt(1, 4);
  for (let i = 0; i < testCount; i++) {
    lastTests.push({
      type: randomChoice(TEST_TYPES),
      date: randomPastDate(randomInt(30, 365))
    });
  }
  
  // Generate immunizations (1-3 in the past 5 years)
  const immunizations = [];
  const immCount = randomInt(1, 3);
  for (let i = 0; i < immCount; i++) {
    immunizations.push({
      name: randomChoice(IMMUNIZATIONS),
      date: randomPastDate(randomInt(30, 1825))
    });
  }
  
  // Generate emergency contact
  const emergencyContact = {
    name: `${randomChoice(FIRST_NAMES)} ${randomChoice(LAST_NAMES)}`,
    phone: generatePhone(),
    relationship: randomChoice(['Spouse', 'Parent', 'Sibling', 'Friend', 'Child'])
  };
  
  return {
    userId,
    dob,
    sex,
    bloodGroup,
    allergies,
    medications,
    conditions,
    lastTests,
    immunizations,
    emergencyContact,
    assignedProvider: providerId
  };
}

/**
 * Generate synthetic provider data
 */
function generateProvider(userId) {
  return {
    userId,
    specialization: randomChoice(SPECIALIZATIONS),
    licenseNumber: `MD${randomInt(100000, 999999)}`
  };
}

/**
 * Generate synthetic wellness entry
 */
function generateWellnessEntry(patientId, daysAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(0, 0, 0, 0);
  
  const steps = randomInt(2000, 12000);
  const sleepHours = parseFloat((randomInt(5, 9) + Math.random()).toFixed(1));
  const waterIntake = randomInt(1000, 3000); // ml
  const preventiveComplianceScore = randomInt(20, 30);
  
  return {
    patientId,
    date,
    steps,
    sleepHours,
    waterIntake,
    preventiveComplianceScore
  };
}

/**
 * Generate synthetic reminder
 */
function generateReminder(patientId) {
  const type = randomChoice(['medication', 'water']);
  const text = randomChoice(REMINDER_TEXTS[type]);
  const times = [];
  const timeCount = randomInt(1, 3);
  for (let i = 0; i < timeCount; i++) {
    times.push(generateTime());
  }
  
  return {
    patientId,
    type,
    text,
    schedule: { times },
    enabled: Math.random() > 0.2 // 80% enabled
  };
}

/**
 * Generate synthetic advisory
 */
function generateAdvisory(providerId, patientId) {
  const status = randomChoice(['active', 'resolved']);
  const tags = randomChoices(['medication', 'lifestyle', 'follow-up', 'urgent'], randomInt(1, 2));
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + randomInt(7, 90));
  
  return {
    providerId,
    patientId,
    text: randomChoice(ADVISORY_TEXTS),
    tags,
    status,
    visibleToPatient: true,
    acknowledgedAt: status === 'resolved' ? randomPastDate(randomInt(1, 30)) : null,
    expiresAt
  };
}

/**
 * Generate synthetic symptom report
 */
function generateSymptomReport(patientId) {
  const symptomCount = randomInt(1, 4);
  const symptoms = [];
  for (let i = 0; i < symptomCount; i++) {
    symptoms.push({
      name: randomChoice(SYMPTOMS),
      severity: randomInt(1, 10)
    });
  }
  
  // Determine recommendation and urgency based on severity
  const maxSeverity = Math.max(...symptoms.map(s => s.severity));
  let recommendation, urgencyLevel;
  if (maxSeverity >= 8) {
    recommendation = 'emergency';
    urgencyLevel = 'critical';
  } else if (maxSeverity >= 6) {
    recommendation = 'see-gp';
    urgencyLevel = 'high';
  } else if (maxSeverity >= 4) {
    recommendation = 'see-gp';
    urgencyLevel = 'medium';
  } else {
    recommendation = 'self-care';
    urgencyLevel = 'low';
  }
  
  return {
    patientId,
    timestamp: randomPastDate(randomInt(1, 60)),
    symptoms,
    recommendation,
    urgencyLevel
  };
}

module.exports = {
  generateUser,
  generatePatient,
  generateProvider,
  generateWellnessEntry,
  generateReminder,
  generateAdvisory,
  generateSymptomReport,
  randomInt,
  randomChoice,
  randomChoices,
  randomDate,
  randomPastDate
};

