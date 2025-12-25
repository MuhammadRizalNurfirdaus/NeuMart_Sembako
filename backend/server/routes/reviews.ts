import express, { Request, Response } from 'express'

const router = express.Router()

// Review interface
export interface Review {
  id: string
  orderId: string
  productId: number
  productName: string
  userId: string
  userName: string
  rating: number // 1-5
  productQuality: number // 1-5
  serviceRating: number // 1-5
  deliveryRating: number // 1-5
  comment: string
  images?: string[]
  createdAt: string
  status: 'pending' | 'approved' | 'rejected'
}

// Mock storage for reviews
const reviews: Map<string, Review> = new Map()

// POST - Create new review
router.post('/create', (req: Request, res: Response) => {
  try {
    const reviewData = req.body

    // Validate required fields
    if (!reviewData.orderId || !reviewData.productId || !reviewData.userId || !reviewData.rating) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
    }

    // Validate rating range
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      })
    }

    // Generate review ID
    const reviewId = `REV-${Date.now()}`

    // Create review object
    const newReview: Review = {
      id: reviewId,
      orderId: reviewData.orderId,
      productId: reviewData.productId,
      productName: reviewData.productName,
      userId: reviewData.userId,
      userName: reviewData.userName,
      rating: reviewData.rating,
      productQuality: reviewData.productQuality || reviewData.rating,
      serviceRating: reviewData.serviceRating || 5,
      deliveryRating: reviewData.deliveryRating || 5,
      comment: reviewData.comment || '',
      images: reviewData.images || [],
      createdAt: new Date().toISOString(),
      status: 'approved' // Auto approve for now
    }

    // Save review
    reviews.set(reviewId, newReview)

    res.json({
      success: true,
      message: 'Review submitted successfully',
      review: newReview
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit review'
    })
  }
})

// GET - Get reviews by product ID
router.get('/product/:productId', (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const productReviews = Array.from(reviews.values())
      .filter(review => review.productId === parseInt(productId) && review.status === 'approved')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Calculate statistics
    const totalReviews = productReviews.length
    const averageRating = totalReviews > 0
      ? productReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0

    const ratingDistribution = {
      5: productReviews.filter(r => r.rating === 5).length,
      4: productReviews.filter(r => r.rating === 4).length,
      3: productReviews.filter(r => r.rating === 3).length,
      2: productReviews.filter(r => r.rating === 2).length,
      1: productReviews.filter(r => r.rating === 1).length,
    }

    res.json({
      success: true,
      reviews: productReviews,
      statistics: {
        totalReviews,
        averageRating: parseFloat(averageRating.toFixed(1)),
        ratingDistribution
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews'
    })
  }
})

// GET - Get reviews by user ID
router.get('/user/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userReviews = Array.from(reviews.values())
      .filter(review => review.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    res.json({
      success: true,
      reviews: userReviews
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user reviews'
    })
  }
})

// GET - Get all reviews (for admin)
router.get('/all', (req: Request, res: Response) => {
  try {
    const allReviews = Array.from(reviews.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Calculate overall statistics
    const totalReviews = allReviews.length
    const averageProductQuality = totalReviews > 0
      ? allReviews.reduce((sum, r) => sum + r.productQuality, 0) / totalReviews
      : 0
    const averageServiceRating = totalReviews > 0
      ? allReviews.reduce((sum, r) => sum + r.serviceRating, 0) / totalReviews
      : 0
    const averageDeliveryRating = totalReviews > 0
      ? allReviews.reduce((sum, r) => sum + r.deliveryRating, 0) / totalReviews
      : 0
    const overallRating = totalReviews > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0

    res.json({
      success: true,
      reviews: allReviews,
      statistics: {
        totalReviews,
        overallRating: parseFloat(overallRating.toFixed(1)),
        productQuality: parseFloat(averageProductQuality.toFixed(1)),
        serviceRating: parseFloat(averageServiceRating.toFixed(1)),
        deliveryRating: parseFloat(averageDeliveryRating.toFixed(1)),
        pendingReviews: allReviews.filter(r => r.status === 'pending').length
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews'
    })
  }
})

// PUT - Update review status (approve/reject)
router.put('/:reviewId/status', (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params
    const { status } = req.body

    const review = reviews.get(reviewId)
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      })
    }

    review.status = status
    reviews.set(reviewId, review)

    res.json({
      success: true,
      message: 'Review status updated',
      review
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update review status'
    })
  }
})

// DELETE - Delete review
router.delete('/:reviewId', (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params

    if (!reviews.has(reviewId)) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      })
    }

    reviews.delete(reviewId)

    res.json({
      success: true,
      message: 'Review deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete review'
    })
  }
})

export default router
