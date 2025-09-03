import { useEffect, useState } from 'react'
import axios from 'axios'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Chip, 
  CircularProgress, 
  Alert,
  Grid2 as Grid
} from '@mui/material'
import { Activity } from './lib/types'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching activities:', error)
        setError(error.message)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading activities...</Typography>
      </Box>
    </Container>
  )
  
  if (error) return (
    <Container>
      <Alert severity="error" sx={{ mt: 2 }}>
        Error: {error}
      </Alert>
    </Container>
  )

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Reactivities
      </Typography>
      
      {activities.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No activities found
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {activities.map(activity => (
            <Grid key={activity.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: '#f5f5f5',
                border: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#eeeeee',
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {activity.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {activity.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={activity.category} 
                      size="small" 
                      color="primary" 
                      sx={{ mr: 1 }}
                    />
                    {activity.isCancelled && (
                      <Chip 
                        label="CANCELLED" 
                        size="small" 
                        color="error"
                      />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    <strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    <strong>Location:</strong> {activity.venue}, {activity.city}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default App
