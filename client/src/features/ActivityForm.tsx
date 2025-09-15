import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid2,
  Alert,
  CircularProgress
} from '@mui/material'
import axios from 'axios'
import { Activity } from '../lib/types/activity'

interface ActivityFormProps {
  onSuccess?: (activity: Activity) => void
  onCancel?: () => void
}

const ActivityForm = ({ onSuccess, onCancel }: ActivityFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: '',
    latitude: 0,
    longitude: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post<Activity>('https://localhost:5000/api/activities', formData)
      setSuccess(true)
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: '',
        latitude: 0,
        longitude: 0
      })

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response.data)
      }
    } catch (err) {
      setError('Failed to create activity. Please try again.')
      console.error('Error creating activity:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Create New Activity
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Activity created successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                variant="outlined"
                placeholder="e.g., Music, Sports, Food"
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={handleInputChange}
                required
                variant="outlined"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  }
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Latitude"
                name="latitude"
                type="number"
                value={formData.latitude}
                onChange={handleInputChange}
                required
                variant="outlined"
                slotProps={{
                  htmlInput: {
                    step: "any",
                    min: -90,
                    max: 90
                  }
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Longitude"
                name="longitude"
                type="number"
                value={formData.longitude}
                onChange={handleInputChange}
                required
                variant="outlined"
                slotProps={{
                  htmlInput: {
                    step: "any",
                    min: -180,
                    max: 180
                  }
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                {onCancel && (
                  <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Creating...' : 'Create Activity'}
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ActivityForm