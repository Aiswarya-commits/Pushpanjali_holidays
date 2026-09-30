const STORAGE_KEY = 'pushpanjali_bookings_v1';

// Initial sample bookings so the admin can immediately see populated data
const initialSeedBookings = [
  {
    id: 'PH-782419',
    createdAt: '2026-09-29T10:15:00.000Z',
    fullName: 'Suresh Menon',
    phone: '+91 94472 88190',
    email: 'suresh@gmail.com',
    pickup: 'Cochin International Airport (COK)',
    drop: 'Munnar (Tea County Resort)',
    travelDate: '2026-10-02',
    pickupTime: '09:30 AM',
    tripType: 'round',
    passengerCount: '4',
    vehicleId: 'toyota-innova',
    vehicleName: 'Toyota Innova Tourist Executive',
    vehicleReg: 'KL 70 H 7498',
    estimatedFare: 6800,
    specialNote: 'Flight arriving from Bangalore at 9:00 AM. 4 large bags + 2 cabin luggage.',
    status: 'Confirmed', // 'New' | 'Confirmed' | 'Chauffeur Assigned' | 'Completed' | 'Cancelled'
    assignedDriver: 'Rajesh Kumar (+91 98471 55220)',
    driverNotes: 'Client requested scenic photo stop at Cheeyappara Falls'
  },
  {
    id: 'PH-653190',
    createdAt: '2026-09-29T14:40:00.000Z',
    fullName: 'Ananya Sharma',
    phone: '+91 98201 34567',
    email: 'ananya.sharma@mumbaicorp.in',
    pickup: 'Ernakulam South Railway Station',
    drop: 'Alleppey (Finishing Point Houseboat Jetty)',
    travelDate: '2026-10-04',
    pickupTime: '11:00 AM',
    tripType: 'oneway',
    passengerCount: '2',
    vehicleId: 'honda-amaze',
    vehicleName: 'Honda Amaze Comfort Sedan',
    vehicleReg: 'KL 52 F 7263',
    estimatedFare: 2400,
    specialNote: 'Need AC on chilled mode. Honeymoon couple.',
    status: 'New',
    assignedDriver: '',
    driverNotes: ''
  },
  {
    id: 'PH-921477',
    createdAt: '2026-09-28T18:20:00.000Z',
    fullName: 'Gopakumar Pillai',
    phone: '+91 94470 12890',
    email: 'gopa.pillai@yahoo.com',
    pickup: 'Thrissur Round',
    drop: 'Sabarimala (Nilakkal Base Camp)',
    travelDate: '2026-10-06',
    pickupTime: '05:00 AM',
    tripType: 'round',
    passengerCount: '15',
    vehicleId: 'force-traveller',
    vehicleName: 'Pushpanjali Force Luxury Traveller',
    vehicleReg: 'KL 63 F 6674',
    estimatedFare: 14500,
    specialNote: 'Pilgrim group of 14 Ayyappa devotees with Irumudi kettu. Roof carrier needed.',
    status: 'Chauffeur Assigned',
    assignedDriver: 'Manoj Varma (+91 94473 11880)',
    driverNotes: 'Special temple darshan pass arranged'
  }
];

export function getStoredBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSeedBookings));
      return initialSeedBookings;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading bookings from localStorage:', err);
    return initialSeedBookings;
  }
}

export function saveBooking(booking) {
  try {
    const current = getStoredBookings();
    const newEntry = {
      ...booking,
      id: booking.id || `PH-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: booking.status || 'New',
      assignedDriver: booking.assignedDriver || '',
      driverNotes: booking.driverNotes || ''
    };
    const updated = [newEntry, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (err) {
    console.error('Error saving booking:', err);
    return booking;
  }
}

export function updateBooking(bookingId, updates) {
  try {
    const current = getStoredBookings();
    const updated = current.map(item => {
      if (item.id === bookingId) {
        return { ...item, ...updates, updatedAt: new Date().toISOString() };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error updating booking:', err);
    return [];
  }
}

export function deleteBooking(bookingId) {
  try {
    const current = getStoredBookings();
    const updated = current.filter(item => item.id !== bookingId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting booking:', err);
    return [];
  }
}

export function exportBookingsToCSV(bookings) {
  const headers = [
    'Booking ID',
    'Date Created',
    'Customer Name',
    'Phone',
    'Email',
    'Pickup Location',
    'Drop Location',
    'Travel Date',
    'Pickup Time',
    'Trip Type',
    'Passengers',
    'Vehicle',
    'Vehicle Reg',
    'Est Fare (INR)',
    'Status',
    'Assigned Driver',
    'Notes'
  ];

  const rows = bookings.map(b => [
    b.id,
    new Date(b.createdAt).toLocaleDateString(),
    `"${(b.fullName || '').replace(/"/g, '""')}"`,
    `"${b.phone || ''}"`,
    `"${b.email || ''}"`,
    `"${(b.pickup || '').replace(/"/g, '""')}"`,
    `"${(b.drop || '').replace(/"/g, '""')}"`,
    b.travelDate,
    b.pickupTime,
    b.tripType,
    b.passengerCount,
    `"${(b.vehicleName || '').replace(/"/g, '""')}"`,
    b.vehicleReg,
    b.estimatedFare || 0,
    b.status,
    `"${(b.assignedDriver || '').replace(/"/g, '""')}"`,
    `"${(b.specialNote || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + 
    [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Pushpanjali_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
