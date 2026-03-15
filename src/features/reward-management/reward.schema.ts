import { z } from 'zod'
import { RewardConditionBy } from './types/reward.types'

const MAX_BANNER_SIZE = 2 * 1024 * 1024
const MAX_LOGO_SIZE = 1 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const imageFileSchema = (maxSize: number) =>
  z
    .custom<File | string>()
    .refine((file) => !!file, 'กรุณาอัปโหลดรูปภาพ')
    .refine(
      (file) => !!file && (typeof file === 'string' || file.size <= maxSize),
      `ขนาดไฟล์เกินกำหนด (สูงสุด ${maxSize / 1024 / 1024} MB)`,
    )
    .refine(
      (file) => !!file && (typeof file === 'string' || ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'รองรับเฉพาะไฟล์ JPG, JPEG, PNG',
    )

const rewardPointSchema = z
  .string()
  .min(1, 'กรุณากรอกข้อมูล')
  .refine((val) => !isNaN(parseInt(val)), { message: 'กรุณากรอกข้อมูลให้ถูกต้อง' })
  .refine((val) => parseInt(val) >= 0, { message: 'กรุณากรอกตามที่กำหนด' })
  .refine((val) => parseInt(val) <= 99999, { message: 'กรุณากรอกตามที่กำหนด' })
  .refine((val) => Number.isInteger(parseFloat(val)), { message: 'กรุณากรอกตามที่กำหนด' })

const nonEmptyString = z.string().min(1, 'กรุณากรอกข้อมูล')

const commonRewardInfoSchema = z.object({
  rewardName: nonEmptyString.max(50),
  rewardSubtitle: z.string().optional(),
  rewardPoint: rewardPointSchema,
  startDateOfPointExchange: nonEmptyString,
  startTimeOfPointExchange: nonEmptyString,
  endDateOfPointExchange: nonEmptyString,
  endTimeOfPointExchange: nonEmptyString,
  rewardDescription: z.string().optional(),
  rewardCondition: nonEmptyString,
  isQrDisplayed: z.boolean(),
  isBarcodeDisplayed: z.boolean(),
  rewardImage: imageFileSchema(MAX_BANNER_SIZE),
  rewardLogo: imageFileSchema(MAX_LOGO_SIZE),
  conditionBy: z.enum([RewardConditionBy.TIER, RewardConditionBy.USER_ID]),
  customerTiers: z.array(z.string()).optional(),
  customerIdsString: z.string().regex(/^$|^\s*[1-9]\d{0,6}(\s*,\s*[1-9]\d{0,6})*\s*$/, {
    message: 'ข้อมูลไม่ถูกต้อง',
  }),
  currentCustomerIds: z.array(z.string()).optional(),
  customerIds: z
    .array(z.number())
    .max(10000, { message: 'จำนวน User ID เกินที่กำหนด' })
    .optional()
    .refine((data) => new Set(data).size === data?.length, { message: 'ข้อมูลซ้ำกัน' }),
  isLimitRedeem: z.boolean(),
  countLimitRedeem: z.number().optional(),
})

type RewardCodeData = {
  rewardCodes?: string
  endDateRewardCode?: string
  endTimeRewardCode?: string
}

export const rewardInfoSchema = commonRewardInfoSchema
  .extend({
    rewardCodes: nonEmptyString,
    endDateRewardCode: nonEmptyString,
    endTimeRewardCode: nonEmptyString,
  })
  .superRefine((data, ctx) => {
    if (data.conditionBy === RewardConditionBy.TIER && !data.customerTiers?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['customerTiers'],
        message: 'กรุณาเลือกอย่างน้อย 1 รายการ',
      })
    } else if (data.conditionBy === RewardConditionBy.USER_ID && !data.customerIds?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['customerIds'],
        message: 'กรุณากรอกข้อมูล',
      })
    }
  })

export type RewardInfoSchemaType = z.infer<typeof rewardInfoSchema>

export const updateRewardInfoSchema = commonRewardInfoSchema
  .extend({
    rewardCodes: z.string().optional(),
    endDateRewardCode: z.string().optional(),
    endTimeRewardCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const fields: (keyof RewardCodeData)[] = ['rewardCodes', 'endDateRewardCode', 'endTimeRewardCode']
    const someEmpty = fields.some((f) => !data[f])
    const someFilled = fields.some((f) => !!data[f])

    if (someEmpty && someFilled) {
      fields.forEach((f) => {
        if (!data[f]) {
          ctx.addIssue({ path: [f], message: 'กรุณากรอกข้อมูล', code: z.ZodIssueCode.custom })
        }
      })
    }

    if (data.conditionBy === RewardConditionBy.TIER && !data.customerTiers?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['customerTiers'],
        message: 'กรุณาเลือกอย่างน้อย 1 รายการ',
      })
    }

    if (data.conditionBy === RewardConditionBy.USER_ID && data.customerIds?.length) {
      const currentIds = data.currentCustomerIds?.map((id) => Number.parseInt(id)) ?? []
      if (data.customerIds.some((id) => currentIds.includes(id))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['customerIds'],
          message: 'ข้อมูลซ้ำกับที่มีอยู่แล้ว',
        })
      }
    }
  })

export type UpdateRewardInfoSchemaType = z.infer<typeof updateRewardInfoSchema>
