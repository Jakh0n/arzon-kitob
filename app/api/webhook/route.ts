import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()

		// Webhook xavfsizligi uchun
		const webhookSecret = request.headers.get('webhook-secret')
		if (webhookSecret !== process.env.HYGRAPH_WEBHOOK_SECRET) {
			return Response.json({ message: 'Unauthorized' }, { status: 401 })
		}

		// Qaysi model o'zgarganini tekshiramiz
		const { data } = body

		// Barcha kerakli sahifalarni yangilaymiz
		await revalidatePath('/', 'layout') // Asosiy sahifa va layout
		await revalidatePath('/books') // Kitoblar sahifasi
		await revalidatePath('/categories') // Kategoriyalar sahifasi

		return Response.json({
			revalidated: true,
			message: 'Kesh muvaffaqiyatli yangilandi',
			timestamp: new Date().toISOString(),
		})
	} catch (error) {
		console.error('Webhook xatosi:', error)
		return Response.json({ message: 'Xatolik yuz berdi' }, { status: 500 })
	}
}
