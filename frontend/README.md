# ThinkX Alumni Network - Mobile Frontend

A comprehensive React Native/Expo application for the ThinkX Alumni Network, featuring role-based dashboards for students, alumni, and administrators.

## Features

### Student Dashboard
- **Home Screen**: View upcoming events and community statistics
- **Job Opportunities**: Browse job postings from alumni, filter by type and location
- **Events**: Browse and register for upcoming alumni events
- **Profile**: View and manage personal profile information

### Alumni Dashboard
- **Dashboard**: View contribution statistics and recent activity
- **Post Jobs**: Create and manage job postings for students
- **Success Stories**: Share success stories and browse community stories
- **Donations**: Make donations to support various initiatives
- **Profile**: Manage professional information and experience

### Admin Dashboard
- **Dashboard**: Overview of system metrics and activity log
- **User Management**: Manage users, view profiles, and control access
- **Content Moderation**: Review and approve/reject user-generated content
- **Reports & Analytics**: View system statistics and engagement metrics
- **Settings**: Configure system settings and preferences

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── config.ts                 # API configuration and interceptors
│   ├── context/
│   │   └── AuthContext.tsx           # Authentication context
│   ├── services/
│   │   ├── authService.ts            # Authentication service
│   │   ├── jobsService.ts            # Jobs management service
│   │   ├── eventsService.ts          # Events management service
│   │   ├── donationsService.ts       # Donations service
│   │   └── storiesService.ts         # Success stories service
│   ├── screens/
│   │   ├── SplashScreen.tsx
│   │   ├── auth/
│   │   │   └── LoginScreen.tsx
│   │   ├── student/
│   │   │   ├── StudentHomeScreen.tsx
│   │   │   ├── StudentJobsScreen.tsx
│   │   │   ├── StudentEventsScreen.tsx
│   │   │   └── StudentProfileScreen.tsx
│   │   ├── alumni/
│   │   │   ├── AlumniDashboardScreen.tsx
│   │   │   ├── AlumniPostJobScreen.tsx
│   │   │   ├── AlumniStoriesScreen.tsx
│   │   │   └── AlumniDonateScreen.tsx
│   │   └── admin/
│   │       ├── AdminDashboardScreen.tsx
│   │       ├── AdminUsersScreen.tsx
│   │       ├── AdminModerationScreen.tsx
│   │       ├── AdminReportsScreen.tsx
│   │       └── AdminSettingsScreen.tsx
│   └── navigation/
│       ├── RootNavigator.tsx         # Main navigation logic
│       ├── StudentNavigator.tsx      # Student bottom tab navigation
│       ├── AlumniNavigator.tsx       # Alumni bottom tab navigation
│       └── AdminNavigator.tsx        # Admin bottom tab navigation
├── App.tsx                           # Main app component
├── app.json                          # Expo configuration
└── package.json                      # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for macOS) or Android Emulator

### Installation

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Configure API URL**
Update `src/api/config.ts` with your backend API URL:
```typescript
const API_BASE_URL = 'http://localhost:5000/api'; // Update as needed
```

3. **Start the Expo development server**
```bash
npm start
```

4. **Run on device/emulator**
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Or scan QR code with Expo Go app

## Authentication Flow

1. **Login**: Users enter email and password on the LoginScreen
2. **Token Storage**: Authentication token is stored in AsyncStorage
3. **Auto-Login**: App checks for existing token on startup and restores session
4. **Role-Based Navigation**: User is routed to appropriate dashboard based on role
5. **Logout**: Clears token and user data from storage

## API Integration

The app communicates with the backend via the following endpoints:

### Authentication
- `POST /auth/login` - Login
- `POST /auth/signup` - Register
- `POST /auth/logout` - Logout
- `GET /auth/profile` - Get current user profile

### Jobs
- `GET /jobs` - List all jobs
- `POST /jobs` - Post a new job (alumni only)
- `GET /jobs/:id` - Get job details
- `POST /jobs/:id/apply` - Apply for a job

### Events
- `GET /events` - List all events
- `POST /events` - Create event
- `POST /events/:id/register` - Register for event
- `GET /events/:id/attendees` - Get event attendees

### Success Stories
- `GET /success-stories` - List all stories
- `POST /success-stories` - Create story (alumni only)
- `POST /success-stories/:id/like` - Like a story
- `POST /success-stories/:id/comments` - Add comment

### Donations
- `POST /donations` - Make a donation
- `GET /donations/stats` - Get donation statistics
- `GET /donations/my-donations` - Get user's donations

### Admin
- `GET /admin/dashboard/stats` - Dashboard statistics
- `GET /admin/users` - List all users
- `GET /admin/moderation/queue` - Moderation queue
- `POST /admin/moderation/:id/approve` - Approve content
- `POST /admin/moderation/:id/reject` - Reject content

## State Management

The app uses React Context API for global state management:

- **AuthContext**: Manages user authentication state and provides login/logout functions
- **Local Component State**: Managed with useState hooks
- **Data Caching**: API responses cached locally during session

## Error Handling

- **Network Errors**: Displayed via Alert dialogs
- **Authentication Errors**: Trigger auto-logout and redirect to login
- **API Errors**: Caught and displayed to user with meaningful messages

## Styling

- **Color Scheme**: Blue (#2563eb) for primary, Red (#dc2626) for admin, Green for success states
- **Typography**: System fonts with consistent sizing
- **Layout**: Flexbox-based responsive design
- **Shadows**: Subtle shadows for depth using native elevation/shadowProps

## Performance Optimization

- **Lazy Loading**: Screens load on demand through bottom tab navigation
- **Image Caching**: Network images cached by React Native
- **API Caching**: Request responses reused during user session
- **Refresh Controls**: Pull-to-refresh functionality on list screens

## Future Enhancements

- [ ] Push notifications for events and messages
- [ ] Offline mode with sync capability
- [ ] Image upload and profile photos
- [ ] Direct messaging between users
- [ ] Advanced search and filtering
- [ ] Dark mode support
- [ ] Accessibility improvements
- [ ] Analytics integration

## Troubleshooting

### Port Already in Use
```bash
expo start -c  # Clear cache and restart
```

### Module Not Found
```bash
rm -rf node_modules && npm install
```

### Emulator Connection Issues
```bash
adb reverse tcp:5000 tcp:5000  # For Android
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Proprietary - ThinkX Alumni Network

## Support

For issues or questions, contact the development team or open an issue in the repository.
