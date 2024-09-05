'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Mock events
const events = [
  {
    id: 1,
    title: 'Client Meeting: John Doe',
    start: new Date(2023, 3, 15, 10, 0),
    end: new Date(2023, 3, 15, 11, 0),
  },
  {
    id: 2,
    title: 'Portfolio Review: Jane Smith',
    start: new Date(2023, 3, 16, 14, 0),
    end: new Date(2023, 3, 16, 15, 30),
  },
  {
    id: 3,
    title: 'Investment Strategy Call',
    start: new Date(2023, 3, 17, 11, 0),
    end: new Date(2023, 3, 17, 12, 0),
  },
  {
    id: 4,
    title: 'Quarterly Review: Robert Johnson',
    start: new Date(2023, 3, 18, 9, 0),
    end: new Date(2023, 3, 18, 10, 30),
  },
  {
    id: 5,
    title: 'Team Meeting',
    start: new Date(2023, 3, 19, 15, 0),
    end: new Date(2023, 3, 19, 16, 0),
  },
];

export default function CalendarPage() {
  const [view, setView] = useState<View>('month');

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-900">Calendar</h1>
        <div className="mb-4">
          <button
            className={`mr-2 px-4 py-2 rounded ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleViewChange('month')}
          >
            Month
          </button>
          <button
            className={`mr-2 px-4 py-2 rounded ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleViewChange('week')}
          >
            Week
          </button>
          <button
            className={`px-4 py-2 rounded ${view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleViewChange('day')}
          >
            Day
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4" style={{ height: '600px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={setView}
            views={['month', 'week', 'day']}
          />
        </div>
      </div>
    </Layout>
  );
}