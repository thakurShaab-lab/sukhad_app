const db = require('../config/drizzle')
const { wlFaq } = require('../schema/wl-faq')
const { eq, and, asc } = require('drizzle-orm')
const { formatHtml } = require('../utils/formatHtml')

const getFaqs = async () => {
    const faqs = await db
        .select({
            faq_id: wlFaq.faqId,
            faq_type: wlFaq.faqType,
            faq_parent_id: wlFaq.faqParentId,
            entity_id: wlFaq.entityId,
            faq_question: wlFaq.faqQuestion,
            faq_answer: wlFaq.faqAnswer,
            sort_order: wlFaq.sortOrder,
            status: wlFaq.status,
            faq_date_added: wlFaq.faqDateAdded
        })
        .from(wlFaq)
        .where(eq(wlFaq.status, 1))
        .orderBy(asc(wlFaq.sortOrder), asc(wlFaq.faqId))

        console.log('FAQs DATA:', faqs)

    return faqs.map((faq) => ({
        ...faq,
        faq_answer: formatHtml(faq.faq_answer)
    }))
}

module.exports = {
    getFaqs
}