import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box 
} from '@mui/material'
import { Activity } from '../lib/types/activity'

interface ActivityCardProps {
  activity: Activity
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        backgroundColor: '#f5f5f5',
        border: 'none',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#eeeeee'
        }
      }}
    >
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {activity.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Location:</strong> {activity.city}, {activity.venue}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={activity.category} 
            variant="outlined" 
            size="small" 
          />
          {activity.isCancelled && (
            <Chip 
              label="Cancelled" 
              color="error" 
              variant="filled" 
              size="small" 
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default ActivityCard