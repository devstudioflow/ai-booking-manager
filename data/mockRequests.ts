import { BookingRequest } from '../types';

export const mockRequests: BookingRequest[] = [
  {
    id: 'req-001',
    name: 'Sophie Marchand',
    email: 'sophie.marchand@gmail.com',
    phone: '+33 6 12 34 56 78',
    serviceType: 'Restaurant Reservation',
    preferredDate: '2026-04-25',
    preferredTime: '19:30',
    guests: 4,
    message:
      "Bonjour, je souhaiterais réserver une table pour 4 personnes samedi soir. Nous fêtons l'anniversaire de ma mère. Pourriez-vous nous préparer un gâteau surprise ? Merci beaucoup.",
    status: 'confirmed',
    category: 'booking',
    priority: 'medium',
    aiSummary:
      'Customer requesting a table for 4 on Saturday evening for a birthday celebration, specifically asking for a surprise cake arrangement.',
    aiSuggestedReply:
      "Chère Sophie, nous serions ravis de vous accueillir samedi 25 avril à 19h30 pour l'anniversaire de votre mère. Votre table pour 4 personnes est confirmée et nous nous ferons un plaisir de préparer un gâteau surprise. N'hésitez pas à nous préciser vos préférences culinaires. À bientôt !",
    notes: 'Birthday table — confirm cake with pastry chef. Window seat preferred.',
    createdAt: '2026-04-18T09:14:00Z',
  },
  {
    id: 'req-002',
    name: 'James Whitfield',
    email: 'j.whitfield@outlook.com',
    phone: '+44 7911 234567',
    serviceType: 'Hotel Booking',
    preferredDate: '2026-05-10',
    preferredTime: '14:00',
    guests: 2,
    message:
      'Hello, I would like to inquire about availability for a double room from May 10 to May 15. We are celebrating our anniversary and would appreciate any special packages you may offer for couples.',
    status: 'pending',
    category: 'booking',
    priority: 'medium',
    aiSummary:
      'Anniversary couple inquiring about a 5-night double room stay from May 10–15, interested in couple-specific packages or upgrades.',
    aiSuggestedReply:
      "Dear James, thank you for choosing us for your anniversary celebration! We have availability for a deluxe double room from May 10–15. We'd be delighted to offer you our Romance Package, which includes complimentary champagne, a couples spa session, and late checkout. I'll send full details to your email shortly.",
    notes: 'Anniversary stay — check Romance Package availability. Consider room upgrade.',
    createdAt: '2026-04-17T15:42:00Z',
  },
  {
    id: 'req-003',
    name: 'Elena Vasquez',
    email: 'elena.v@coachpro.com',
    phone: '+1 415 987 6543',
    serviceType: 'Coaching Session',
    preferredDate: '2026-04-22',
    preferredTime: '10:00',
    guests: 1,
    message:
      'Hi, I am looking to book an initial consultation with one of your life coaches. I have been struggling with work-life balance and career transitions. I would prefer a morning slot on Tuesday or Wednesday.',
    status: 'confirmed',
    category: 'booking',
    priority: 'medium',
    aiSummary:
      'New client seeking initial life coaching consultation focusing on work-life balance and career transitions, prefers morning slots Tuesday or Wednesday.',
    aiSuggestedReply:
      "Hi Elena, we'd love to support you on your journey! We have confirmed a 60-minute initial consultation on Tuesday, April 22 at 10:00 AM with Coach Marie Laurent, who specializes in career transitions and work-life balance. You'll receive a confirmation email with the meeting link and a brief intake form. Looking forward to speaking with you!",
    notes: 'Match with Coach Marie — career transitions specialist. Send intake form.',
    createdAt: '2026-04-16T11:20:00Z',
  },
  {
    id: 'req-004',
    name: 'Amara Diallo',
    email: 'amara.diallo@yahoo.fr',
    phone: '+33 7 45 67 89 01',
    serviceType: 'Hair & Beauty Appointment',
    preferredDate: '2026-04-26',
    preferredTime: '11:00',
    guests: 1,
    message:
      "Bonjour, je voudrais prendre rendez-vous pour une coloration complète et un soin capillaire. J'ai des cheveux naturels type 4C et je cherche un styliste expérimenté avec ce type de cheveux.",
    status: 'pending',
    category: 'booking',
    priority: 'medium',
    aiSummary:
      'Client booking a full hair coloring and treatment appointment, specifically requesting a stylist experienced with type 4C natural hair.',
    aiSuggestedReply:
      "Bonjour Amara, nous serions ravis de vous accueillir ! Notre styliste Joëlle est spécialisée dans les cheveux naturels type 4C et sera disponible le samedi 26 avril à 11h00. La séance complète (coloration + soin) dure environ 3h. Pourriez-vous nous préciser la teinte souhaitée ? N'hésitez pas à envoyer une photo d'inspiration.",
    notes: 'Book with Joelle — natural hair specialist. Ask for color reference photo.',
    createdAt: '2026-04-18T08:05:00Z',
  },
  {
    id: 'req-005',
    name: 'Michael Okafor',
    email: 'michael.okafor@healthmail.com',
    phone: '+44 7700 900456',
    serviceType: 'Dental Appointment',
    preferredDate: '2026-04-30',
    preferredTime: '09:00',
    guests: 1,
    message:
      "I need to schedule a routine dental checkup and cleaning. It's been about 18 months since my last visit. I'm also slightly anxious about dental procedures so would appreciate a gentle approach.",
    status: 'pending',
    category: 'booking',
    priority: 'low',
    aiSummary:
      'Patient requesting routine checkup and cleaning after 18-month gap, notes dental anxiety and requests a gentle approach from the practitioner.',
    aiSuggestedReply:
      "Dear Michael, thank you for reaching out! We completely understand dental anxiety and Dr. Peterson is known for her patient and gentle approach. We've scheduled your routine checkup and cleaning for Wednesday, April 30 at 9:00 AM. Please arrive 10 minutes early to complete a brief health form. We'll ensure you're comfortable throughout your visit.",
    notes: 'Assign to Dr. Peterson — anxiety note in file. Prepare comfort protocol.',
    createdAt: '2026-04-17T13:55:00Z',
  },
  {
    id: 'req-006',
    name: 'Charlotte Dupont',
    email: 'c.dupont@legalfirm.fr',
    phone: '+33 1 23 45 67 89',
    serviceType: 'Legal Consultation',
    preferredDate: '2026-04-24',
    preferredTime: '14:00',
    guests: 1,
    message:
      "Bonjour, je souhaite consulter un avocat spécialisé en droit du travail. Je fais face à une situation de licenciement abusif et j'aurais besoin d'une première consultation pour évaluer mes options légales.",
    status: 'confirmed',
    category: 'booking',
    priority: 'high',
    aiSummary:
      'Urgent legal consultation request regarding wrongful termination (licenciement abusif), requires an employment law specialist for initial case assessment.',
    aiSuggestedReply:
      "Chère Charlotte, nous avons bien reçu votre demande urgente. Maître Lefebvre, notre spécialiste en droit du travail, vous recevra le vendredi 24 avril à 14h00. Cette première consultation (1h) permettra d'évaluer votre situation et vos options légales. Merci de préparer tous les documents relatifs à votre licenciement (contrat, lettre de licenciement, échanges écrits).",
    notes: 'Assign to Maitre Lefebvre — employment law. Urgent file review needed.',
    createdAt: '2026-04-15T10:30:00Z',
  },
  {
    id: 'req-007',
    name: 'Lucas Fontaine',
    email: 'lucas.fontaine@hotmail.com',
    phone: '+33 6 78 90 12 34',
    serviceType: 'Restaurant Reservation',
    preferredDate: '2026-04-19',
    preferredTime: '20:00',
    guests: 8,
    message:
      "URGENT — Je dois organiser un dîner professionnel ce soir pour 8 personnes. C'est très important pour nous. Pouvez-vous nous accommoder ? Je suis prêt à payer un supplément si nécessaire. Merci de me rappeler au plus vite.",
    status: 'pending',
    category: 'urgent_request',
    priority: 'high',
    aiSummary:
      'URGENT: Same-day professional dinner request for 8 guests tonight at 8 PM, client willing to pay premium pricing and requests immediate callback.',
    aiSuggestedReply:
      "Cher Lucas, nous avons bien reçu votre demande urgente ! Je vous contacte immédiatement par téléphone pour confirmer la disponibilité. Nous ferons tout notre possible pour vous accueillir ce soir à 20h00 pour votre dîner professionnel de 8 personnes. Notre chef prépare un menu spécial sur mesure pour les occasions d'affaires.",
    notes: 'URGENT — Call back immediately. Check private dining room availability.',
    createdAt: '2026-04-19T07:30:00Z',
  },
  {
    id: 'req-008',
    name: 'Priya Sharma',
    email: 'priya.s@gmail.com',
    phone: '+44 7891 012345',
    serviceType: 'Hotel Booking',
    preferredDate: '2026-05-01',
    preferredTime: '12:00',
    guests: 2,
    message:
      "I need to cancel my hotel reservation for May 1–5. We unfortunately have a family emergency and cannot travel. I would like a full refund if possible. Our booking reference is HTL-2026-0892.",
    status: 'cancelled',
    category: 'cancellation',
    priority: 'high',
    aiSummary:
      'Guest requesting cancellation of 4-night hotel reservation (ref: HTL-2026-0892) due to family emergency, requesting full refund consideration.',
    aiSuggestedReply:
      "Dear Priya, we are very sorry to hear about your family emergency and hope everything resolves well. We have processed the cancellation of your reservation HTL-2026-0892. Given the exceptional circumstances, we are pleased to offer you a full refund which will be credited to your original payment method within 5–7 business days. We hope to welcome you in better times.",
    notes: 'Refund approved — family emergency. Process immediately. Keep goodwill.',
    createdAt: '2026-04-16T18:20:00Z',
  },
  {
    id: 'req-009',
    name: 'Thomas Berger',
    email: 'thomas.berger@work.de',
    phone: '+49 170 1234567',
    serviceType: 'Coaching Session',
    preferredDate: '2026-04-28',
    preferredTime: '15:00',
    guests: 1,
    message:
      "Hello, I would like to reschedule my coaching session from April 23 to April 28 if possible. I have an important meeting that has come up on the 23rd. My original booking reference is CS-2026-0445.",
    status: 'confirmed',
    category: 'reschedule',
    priority: 'medium',
    aiSummary:
      'Client requesting rescheduling of coaching session from April 23 to April 28 due to a conflicting work meeting, reference CS-2026-0445.',
    aiSuggestedReply:
      "Dear Thomas, no problem at all! We have successfully moved your coaching session from April 23 to Monday, April 28 at 3:00 PM with Coach Martin. Your booking reference remains CS-2026-0445. You'll receive an updated calendar invitation shortly. Looking forward to your session!",
    notes: 'Rescheduled from Apr 23 → Apr 28. Notify Coach Martin. Update calendar.',
    createdAt: '2026-04-17T09:45:00Z',
  },
  {
    id: 'req-010',
    name: 'Isabelle Renaud',
    email: 'isabelle.renaud@free.fr',
    phone: '+33 6 23 45 67 89',
    serviceType: 'Hair & Beauty Appointment',
    preferredDate: '2026-05-03',
    preferredTime: '10:00',
    guests: 1,
    message:
      "Bonjour, pourriez-vous m'indiquer vos tarifs pour une balayage + brushing + coupe ? J'ai des cheveux mi-longs. Je voudrais aussi savoir si vous proposez des forfaits spéciaux.",
    status: 'pending',
    category: 'pricing_question',
    priority: 'low',
    aiSummary:
      'Client inquiring about pricing for balayage, blowout, and haircut for mid-length hair, also asking about special package deals.',
    aiSuggestedReply:
      "Bonjour Isabelle ! Voici nos tarifs pour cheveux mi-longs : Balayage à partir de 85€, Coupe + brushing à partir de 55€, soit un total d'environ 140€. Nous proposons également notre Forfait Luminosité à 165€ incluant le balayage, soin hydratant, coupe et brushing — une économie de 25€. Souhaitez-vous prendre rendez-vous ?",
    notes: 'Send full price list PDF. Recommend Luminosite package.',
    createdAt: '2026-04-18T14:10:00Z',
  },
  {
    id: 'req-011',
    name: 'David Chen',
    email: 'david.chen@techcorp.io',
    phone: '+1 650 555 0198',
    serviceType: 'Dental Appointment',
    preferredDate: '2026-05-07',
    preferredTime: '08:00',
    guests: 1,
    message:
      "Hi, I recently moved to the area and I'm looking for a new dentist. Do you accept new patients? What insurance plans do you work with? I have Delta Dental PPO. Also, do you offer early morning appointments?",
    status: 'pending',
    category: 'general_inquiry',
    priority: 'low',
    aiSummary:
      'New resident seeking new patient information, asking about insurance acceptance (Delta Dental PPO) and early morning appointment availability.',
    aiSuggestedReply:
      "Hi David, welcome to the area! We are absolutely accepting new patients and would be happy to have you join our practice. We do accept Delta Dental PPO insurance. We offer early morning appointments starting at 8:00 AM on Tuesday through Friday. We'll schedule your new patient comprehensive exam (90 min) and verify your insurance benefits beforehand. See you May 7!",
    notes: 'New patient — verify Delta Dental PPO coverage. Schedule new patient exam.',
    createdAt: '2026-04-16T16:30:00Z',
  },
  {
    id: 'req-012',
    name: 'Marie-Claire Bonnet',
    email: 'mc.bonnet@orange.fr',
    phone: '+33 6 56 78 90 12',
    serviceType: 'Restaurant Reservation',
    preferredDate: '2026-04-12',
    preferredTime: '12:30',
    guests: 6,
    message:
      "Bonjour, je vous écris pour confirmer que notre déjeuner du dimanche 12 avril s'est très bien passé. Le service était impeccable et la cuisine excellente. Nous reviendrons certainement. Merci pour votre accueil chaleureux !",
    status: 'completed',
    category: 'general_inquiry',
    priority: 'low',
    aiSummary:
      'Post-visit positive feedback from a 6-person Sunday lunch group, praising service and cuisine quality, indicating intent to return.',
    aiSuggestedReply:
      "Chère Marie-Claire, merci infiniment pour votre gentil message ! C'est avec un grand plaisir que nous avons accueilli votre groupe dimanche. Votre satisfaction est notre plus belle récompense. Nous espérons vous retrouver bientôt pour un prochain repas. En attendant, n'hésitez pas à partager votre expérience sur Google ou TripAdvisor !",
    notes: 'Positive feedback logged. Share with team at next meeting. Add to VIP list.',
    createdAt: '2026-04-13T10:00:00Z',
  },
];
