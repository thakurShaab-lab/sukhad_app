
const { eq, and, sql, inArray } = require('drizzle-orm')
const db = require('../config/drizzle')
const { wlCmsPages } = require('../schema/wl-cms-pages')
const { wlAboutChoose } = require('../schema/wl-about-choose')
const { wlExpertise } = require('../schema/wl-expertise')

// wl_cms_pages rows shown as sections on the About Us page
const ABOUT_US_SECTION_PAGE_IDS = {
    companyOverview: 6,     // Company Overview
    converter: 7,           // Catalytic Converter & Scrap Trading
}

const findActivePagesByName = async (normalizedSearch) => {
    const pages = await db
        .select({
            pageId: wlCmsPages.pageId,
            parentId: wlCmsPages.parentId,
            pageName: wlCmsPages.pageName,
            friendlyUrl: wlCmsPages.friendlyUrl,
            pageDescription: wlCmsPages.pageDescription,
            pageShortDescription: wlCmsPages.pageShortDescription,
            pageImage: wlCmsPages.pageImage,
            pageUpdatedDate: wlCmsPages.pageUpdatedDate
        })
        .from(wlCmsPages)
        .where(
            and(
                eq(wlCmsPages.status, '1'),
                sql`REGEXP_REPLACE(
          LOWER(${wlCmsPages.pageName}),
          '[^[:alnum:]]',
          ''
        ) = ${normalizedSearch}`
            )
        )

    return pages[0]
}

const findActivePageById = async (pageId) => {
    const rows = await db
        .select({
            pageId: wlCmsPages.pageId,
            parentId: wlCmsPages.parentId,
            pageName: wlCmsPages.pageName,
            friendlyUrl: wlCmsPages.friendlyUrl,
            pageDescription: wlCmsPages.pageDescription,
            pageShortDescription: wlCmsPages.pageShortDescription,
            pageImage: wlCmsPages.pageImage,
            pageUpdatedDate: wlCmsPages.pageUpdatedDate
        })
        .from(wlCmsPages)
        .where(
            and(
                eq(wlCmsPages.pageId, pageId),
                eq(wlCmsPages.status, '1')
            )
        )
        .limit(1)

    return rows[0] ?? null
}

const aboutUs = async (normalizedSearch) => {
    const aboutUsData = await db
        .select({
            pageId: wlCmsPages.pageId,
            parentId: wlCmsPages.parentId,
            pageName: wlCmsPages.pageName,
            friendlyUrl: wlCmsPages.friendlyUrl,
            pageDescription: wlCmsPages.pageDescription,
            pageShortDescription: wlCmsPages.pageShortDescription,
            pageImage: wlCmsPages.pageImage,
            pageUpdatedDate: wlCmsPages.pageUpdatedDate
        })
        .from(wlCmsPages)
        .where(
            and(
                eq(wlCmsPages.status, '1'),
                sql`REGEXP_REPLACE(
                    LOWER(${wlCmsPages.pageName}),
                    '[^[:alnum:]]',
                    ''
                ) = ${normalizedSearch}`
            )
        )
        .limit(1)

    const aboutChoose = await db
        .select({
            pageId: wlAboutChoose.chooseId,
            pageTitle: wlAboutChoose.chooseTitle,
            pageDescription: wlAboutChoose.chooseDescription,
            sortOrder: wlAboutChoose.sortOrder,
            addedDate: wlAboutChoose.dateAdded,
            updatedDate: wlAboutChoose.dateUpdated
        })
        .from(wlAboutChoose)
        .where(eq(wlAboutChoose.status, 1))
        .orderBy(wlAboutChoose.sortOrder)

    const expertise = await db
        .select({
            pageId: wlExpertise.expertiseId,
            templateId: wlExpertise.templeId,
            pageName: wlExpertise.expertiseName,
            designation: wlExpertise.designation,
            mobileNumber: wlExpertise.mobileNumber,
            experience: wlExpertise.experience,
            expertiseImage: wlExpertise.expertiseImage,
            expertiseDescription: wlExpertise.expertiseDescription,
            sortOrder: wlExpertise.sortOrder,
            pageAddedDate: wlExpertise.dateAdded,
            pageUpdatedDate: wlExpertise.dateUpdated
        })
        .from(wlExpertise)
        .where(eq(wlExpertise.status, 1))
        .orderBy(wlExpertise.sortOrder)

    const sectionPages = await db
        .select({
            pageId: wlCmsPages.pageId,
            pageName: wlCmsPages.pageName,
            pageDescription: wlCmsPages.pageDescription,
            pageImage: wlCmsPages.pageImage,
        })
        .from(wlCmsPages)
        .where(
            and(
                inArray(wlCmsPages.pageId, Object.values(ABOUT_US_SECTION_PAGE_IDS)),
                eq(wlCmsPages.status, '1')
            )
        )

    const findSection = (pageId) => sectionPages.find((item) => item.pageId === pageId) || null

    const aboutUs = aboutUsData[0] || []

    return {
        aboutUs,
        companyOverview: findSection(ABOUT_US_SECTION_PAGE_IDS.companyOverview),
        converter: findSection(ABOUT_US_SECTION_PAGE_IDS.converter),
        aboutChoose,
        expertise
    }
}

module.exports = {
    findActivePagesByName,
    findActivePageById,
    aboutUs
}