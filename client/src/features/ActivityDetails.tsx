import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box,
  Divider
} from '@mui/material'
import { Activity } from '../lib/types/activity'

interface ActivityDetailsProps {
  activity: Activity
}

const ActivityDetails = ({ activity }: ActivityDetailsProps) => {
  return (
    <Card 
      sx={{ 
        backgroundColor: '#f9f9f9',
        border: 'none',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip 
            label={activity.category} 
            variant="filled" 
            color="primary"
            size="medium" 
          />
          {activity.isCancelled && (
            <Chip 
              label="Cancelled" 
              color="error" 
              variant="filled" 
              size="medium" 
            />
          )}
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="h6" component="h3" gutterBottom>
          {activity.title}
        </Typography>
        
        <Typography 
          variant="body1" 
          component="p"
          color="text.secondary" 
          sx={{ mb: 2, lineHeight: 1.6 }}
        >
          {activity.description}
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2">
            <strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            <strong>Location:</strong> {activity.city}, {activity.venue}
          </Typography>
          <Typography variant="body2">
            <strong>Coordinates:</strong> {activity.latitude.toFixed(4)}, {activity.longitude.toFixed(4)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ActivityDetails