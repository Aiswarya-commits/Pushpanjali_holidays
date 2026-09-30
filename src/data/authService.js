const CURRENT_USER_KEY = 'pushpanjali_current_user_v1';
const REGISTERED_USERS_KEY = 'pushpanjali_users_db_v1';

// Seeded users
const seedUsers = [
  {
    id: 'usr_admin',
    name: 'Pushpanjali Fleet Manager',
    email: 'admin@gmail.com',
    phone: '+91 99614 77380',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 'usr_suresh',
    name: 'Suresh Menon',
    email: 'suresh@gmail.com',
    phone: '+91 99614 77380',
    password: 'password123',
    role: 'user'
  }
];

export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (!raw) {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(seedUsers));
      return seedUsers;
    }
    return JSON.parse(raw);
  } catch (err) {
    return seedUsers;
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

export function login(emailOrUsername, password) {
  const users = getRegisteredUsers();
  const cleanInput = (emailOrUsername || '').trim().toLowerCase();

  // Special Admin bypass check
  if ((cleanInput === 'admin@gmail.com' || cleanInput === 'admin') && 
      (password === 'admin123' || password === 'pushpanjali')) {
    const adminUser = {
      id: 'usr_admin',
      name: 'Pushpanjali Fleet Admin',
      email: 'admin@gmail.com',
      phone: '+91 99614 77380',
      role: 'admin'
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminUser));
    return { success: true, user: adminUser };
  }

  // Check registered users
  const found = users.find(u => 
    u.email.toLowerCase() === cleanInput && u.password === password
  );

  if (found) {
    const sessionUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
      role: found.role || 'user'
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  }

  return { success: false, message: 'Invalid email or password. Please try again.' };
}

export function signup({ name, phone, email, password }) {
  const users = getRegisteredUsers();
  const cleanEmail = (email || '').trim().toLowerCase();

  // Check if email already registered
  const exists = users.some(u => u.email.toLowerCase() === cleanEmail);
  if (exists) {
    return { success: false, message: 'An account with this email already exists. Please sign in.' };
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    name: name.trim(),
    phone: phone.trim(),
    email: cleanEmail,
    password: password,
    role: 'user'
  };

  const updatedUsers = [...users, newUser];
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updatedUsers));

  // Auto login
  const sessionUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role
  };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
}

export function logout() {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
  } catch (err) {}
}
