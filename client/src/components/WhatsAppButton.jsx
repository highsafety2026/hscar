import { MessageCircle } from 'lucide-react'

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/966542206000?text=مرحباً، أريد الاستفسار عن خدمات الفحص"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="تواصل واتساب"
    >
      <MessageCircle size={28} />
      <span>واتساب</span>
    </a>
  )
}

export default WhatsAppButton
