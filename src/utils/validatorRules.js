import {
    validPhone,
    validPhone3,
    validNumber,
    trueNumber,
    validDouble,
    validDoublePlus,
    validPasswordLevel,
    integerCheck
} from '@/utils/form-verify'

export const formValidator = {
    default: {
        required: true,
        message: '此项必填',
        trigger: ['change', 'blur']
    },
    required: {
        required: true,
        message: '此项必填',
        trigger: ['change', 'blur']
    },
    email: {
        type: 'email',
        message: '请输入正确的邮箱地址',
        trigger: 'blur'
    },
    phone: {
        validator: validPhone,
        message: '请输入正确的手机号码',
        trigger: 'blur'
    },
    phonePlus: {
        validator: validPhone3,
        // message: '请输入正确的手机号码',
        trigger: 'blur'
    },
    number: {
        validator: validNumber,
        message: '请输入正确的数字',
        trigger: ['change', 'blur']
    },
    double: {
        validator: validDouble(2),
        message: '请输入正确的金额（最多保留2位小数）',
        trigger: ['change', 'blur']
    },
    double1: {
        validator: validDouble(1),
        message: '请输入正确的金额（最多保留1位小数）',
        trigger: ['change', 'blur']
    },
    double2: {
        validator: validDouble(2),
        message: '请输入正确的金额（最多保留2位小数）',
        trigger: ['change', 'blur']
    },
    double3: {
        validator: validDouble(3),
        message: '请输入正确的金额（最多保留3位小数）',
        trigger: ['change', 'blur']
    },
    double4: {
        validator: validDouble(4),
        message: '请输入正确的金额（最多保留4位小数）',
        trigger: ['change', 'blur']
    },
    double2Plus: {
        validator: validDoublePlus(2),
        message: '请输入正确的金额（最多保留2位小数）',
        trigger: ['change', 'blur']
    },
    double4Plus: {
        validator: validDoublePlus(4),
        message: '请输入正确的金额（最多保留4位小数）',
        trigger: ['change', 'blur']
    },
    intCheck: {
        validator: trueNumber,
        message: '只能输入正整数',
        trigger: ['change', 'blur']
    },
    integerCheck: {
        validator: integerCheck,
        message: '只能输入整数',
        trigger: ['change', 'blur']
    },
    imperfectVerification: {
        required: true,
        message: '此项必填',
        trigger: ['change', 'blur']
    },
    password: {
        validator: validPasswordLevel,
        trigger: ['change', 'blur']
    }
}