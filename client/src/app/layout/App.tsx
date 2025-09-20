import { useEffect, useState } from 'react'
import { 
  Container, 
  Typography, 
  Grid2, 
  CircularProgress, 
  Alert,
  Box
} from '@mui/material'
import axios from 'axios'
import { Activity } from  '../../lib/types/activity'
import NavBar from './NavBar'
import ActivityCard from '../../features/ActivityCard'
import ActivityDetails from '../../features/ActivityDetails'
import ActivityForm from '../../features/ActivityForm'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [currentView, setCurrentView] = useState<'list' | 'details' | 'create'>('list')

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get<Activity[]>('https://localhost:5000/api/activities')
        setActivities(response.data)
      } catch (err) {
        setError('Failed to fetch activities. Please try again later.')
        console.error('Error fetching activities:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity)
    setCurrentView('details')
  }

  const handleBackToList = () => {
    setSelectedActivity(null)
    setCurrentView('list')
  }

  const handleCreateActivity = () => {
    setCurrentView('create')
  }

  const handleActivityCreated = (newActivity: Activity) => {
    setActivities(prev => [...prev, newActivity])
    setCurrentView('list')
  }

  const handleCancelCreate = () => {
    setCurrentView('list')
  }

  const handleDeleteActivity = async (activityId: string) => {
    try {
      await axios.delete(`https://localhost:5000/api/activities/${activityId}`)
      // Remove the activity from the state
      setActivities(prev => prev.filter(activity => activity.id !== activityId))
      // Go back to the list view
      setCurrentView('list')
      setSelectedActivity(null)
    } catch (err) {
      console.error('Error deleting activity:', err)
      alert('Failed to delete activity. Please try again.')
    }
  }

  if (loading) {
    return (
      <>
        <NavBar onActivitiesClick={handleBackToList} onCreateActivityClick={handleCreateActivity} />
        <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress />
            <Typography>Loading activities...</Typography>
          </Box>
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <NavBar onActivitiesClick={handleBackToList} onCreateActivityClick={handleCreateActivity} />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </>
    )
  }

  return (
    <>
      <NavBar onActivitiesClick={handleBackToList} onCreateActivityClick={handleCreateActivity} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {currentView === 'list' ? (
          <>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              Activities
            </Typography>
            
            <Grid2 container spacing={3}>
              {activities.map((activity) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={activity.id}>
                  <Box onClick={() => handleActivityClick(activity)} sx={{ cursor: 'pointer' }}>
                    <ActivityCard activity={activity} />
                  </Box>
                </Grid2>
              ))}
            </Grid2>
          </>
        ) : currentView === 'details' ? (
          selectedActivity && (
            <>
              <Typography variant="h3" component="h1" gutterBottom align="center">
                Activity Details
              </Typography>
              <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                <ActivityDetails 
                  activity={selectedActivity} 
                  onDelete={handleDeleteActivity}
                />
              </Box>
            </>
          )
        ) : (
          <>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              Create New Activity
            </Typography>
            <ActivityForm 
              onSuccess={handleActivityCreated}
              onCancel={handleCancelCreate}
            />
          </>
        )}
      </Container>
    </>
  )
}

export default App