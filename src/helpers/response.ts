import { Response } from 'express'

export const createdResponse = (res: Response, data) => {
  return res.status(201).json({
    message: 'success',
    data,
  })
}

export const successResponse = (res: Response, data) => {
  return res.status(200).json({
    message: 'success',
    data,
  })
}

export const paginationResponse = (res: Response, data, totalData: number, page: number, limit: number) => {
  const totalPages = Math.ceil(totalData / limit)
  const currentPage = page
  const nextPage = currentPage < totalPages ? currentPage + 1 : null
  const prevPage = currentPage > 1 ? currentPage - 1 : null

  return res.json({
    data,
    pagination: {
      total_items: totalData,
      total_pages: totalPages,
      current_page: currentPage,
      page_size: limit,
      next_page: nextPage,
      prev_page: prevPage,
    },
  })
}
