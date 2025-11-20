export const LOCAL_STORAGE_KEY = {
  LANGUAGE: 'language',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  THEME: 'theme',
  PAYMENT_EXPIRE_TIME: 'paymentExpireTime',
};

export const SYSTEM_ERROR = {
  SERVER_ERROR: {
    STATUS: 'Server Error',
    MESSAGE: 'Không thể kết nối đến sever. Vui lòng thử lại',
  },

  NETWORK_ERROR: {
    STATUS: 'Network Error',
    MESSAGE: 'Yêu cầu đã bị hủy',
  },

  TIMEOUT_ERROR: {
    STATUS: 'Request Timeout',
    MESSAGE: 'Yêu cầu đã hết thời gian',
  },
};

export const MESSAGE_CODE = {
  //validate
  VALIDATION_ERROR: 'Lỗi xác thực',
  INVALID_DATE_FORMAT: 'Định dạng ngày không hợp lệ',
  EMAIL_REQUIRED: 'Email là bắt buộc',
  EMAIL_ALREADY_EXISTS: 'Email đã tồn tại',
  PHONE_ALREADY_EXISTS: 'Số điện thoại đã tồn tại',
  NAME_ALREADY_EXISTS: 'Tên đã tồn tại',
  ID_REQUIRED: 'Thiếu ID',
  IN_USE: 'Đang được sử dụng',
  INVALID_NUM_APPLICATIONS: 'Số lượng ứng tuyển không hợp lệ',
  FILE_REQUIRED: 'Tệp tin là bắt buộc',
  CANNOT_UPDATE_ACTIVE_PACKAGE: 'Không thể cập nhật gói đang hoạt động',
  EXISTING_PENDING_ORDER: 'Đang có đơn hàng chờ xử lý',
  OUT_OF_POST_LIMIT: 'Hết giới hạn đăng tin',
  VIP_PACKAGE_NOT_FOUND: 'Không tìm thấy gói VIP',
  OUT_OF_VIP_POST: 'Hết lượt đăng VIP',
  //auth
  MISSING_CREDENTIALS: 'Thiếu thông tin đăng nhập',
  INVALID_CREDENTIALS: 'Thông tin đăng nhập không hợp lệ',
  ACCOUNT_IS_LOCKED: 'Tài khoản đã bị khóa',
  COMPANY_NOT_APPROVED: 'Công ty chưa được phê duyệt',
  INVALID_OR_EXPIRED_TOKEN: 'Token không hợp lệ hoặc đã hết hạn',
  TOKEN_EXPIRED: 'Token đã hết hạn',
  INVALID_TOKEN: 'Token không hợp lệ',
  UNAUTHORIZED: 'Không được cấp quyền',
  TOKEN_REQUIRED: 'Yêu cầu token',
  JWT_SECRET_NOT_SET: 'Chưa thiết lập JWT secret',
  FORBIDDEN: 'Truy cập bị cấm',
  INVALID_PASSWORD: 'Mật khẩu không đúng',
  //sever
  INTERNAL_SERVER_ERROR: 'Lỗi máy chủ nội bộ',
  //success
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
  CREATED_SUCCESS: 'Tạo mới thành công',
  REGISTER_SUCCESS: 'Đăng ký thành công',
  UPDATED_SUCCESS: 'Cập nhật thành công',
  DELETED_SUCCESS: 'Xóa thành công',
  GET_ALL_SUCCESS: 'Lấy danh sách thành công',
  GET_SUCCESS: 'Lấy dữ liệu thành công',
  NOT_FOUND: 'Không tìm thấy',
  COMPANY_NOT_FOUND: 'Không tìm thấy công ty',
  PASSWORD_RESET_EMAIL_SENT: 'Đã gửi email đặt lại mật khẩu',
  //fail
  EMAIL_SEND_FAILED: 'Gửi email thất bại',
};

export const MAX_PAGE_SIZE = 10000000;
export const MAX_PAGE_SHOW = 7;
export const DEFAULT_TIME_ZONE = 'Asia/Bangkok';
export const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  COMPANY: 'COMPANY',
};

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
};

export const GENDER_ARRAY = Object.values(GENDER);

export const GENDER_SHOWS = {
  [GENDER.MALE]: 'Nam',
  [GENDER.FEMALE]: 'Nữ',
  [GENDER.OTHER]: 'Khác',
};

export const RESUME_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const RESUME_STATUS_ARRAY = Object.values(RESUME_STATUS);

export const RESUME_STATUS_SHOWS = {
  [RESUME_STATUS.PENDING]: 'PENDING',
  [RESUME_STATUS.APPROVED]: 'APPROVED',
  [RESUME_STATUS.REJECTED]: 'REJECTED',
};

export const JOB_TYPE = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  INTERNSHIP: 'INTERNSHIP',
  FREELANCE: 'FREELANCE',
  REMOTE: 'REMOTE',
};

export const JOB_TYPE_ARRAY = Object.values(JOB_TYPE);

export const JOB_TYPE_SHOWS = {
  [JOB_TYPE.FULL_TIME]: 'Full time',
  [JOB_TYPE.PART_TIME]: 'Part time',
  [JOB_TYPE.INTERNSHIP]: 'Internship',
  [JOB_TYPE.FREELANCE]: 'Freelance',
  [JOB_TYPE.REMOTE]: 'Remote',
};

export const JOB_LEVEL = {
  INTERN: 'INTERN',
  FRESHER: 'FRESHER',
  JUNIOR: 'JUNIOR',
  MID: 'MID',
  SENIOR: 'SENIOR',
  LEAD: 'LEAD',
};

export const JOB_LEVEL_ARRAY = Object.values(JOB_LEVEL);

export const JOB_LEVEL_SHOWS = {
  [JOB_LEVEL.INTERN]: 'Intern',
  [JOB_LEVEL.FRESHER]: 'Fresher',
  [JOB_LEVEL.JUNIOR]: 'Junior',
  [JOB_LEVEL.MID]: 'Mid',
  [JOB_LEVEL.SENIOR]: 'Senior',
  [JOB_LEVEL.LEAD]: 'Lead',
};

export const VIP_PACKAGE_LEVEL: Record<string, string> = {
  BASIC: 'BASIC',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM',
  DIAMOND: 'DIAMOND',
};

export const VIP_PACKAGE_LEVEL_NUMERIC: Record<number, string> = {
  0: 'BASIC',
  1: 'SILVER',
  2: 'GOLD',
  3: 'PLATINUM',
  4: 'DIAMOND',
};

export const VIP_PACKAGE_LEVEL_SHOWS = {
  [VIP_PACKAGE_LEVEL.BASIC]: 'Basic',
  [VIP_PACKAGE_LEVEL.SILVER]: 'Silver',
  [VIP_PACKAGE_LEVEL.GOLD]: 'Gold',
  [VIP_PACKAGE_LEVEL.PLATINUM]: 'Platinum',
  [VIP_PACKAGE_LEVEL.DIAMOND]: 'Diamond',
};

export const VIP_PACKAGE_LEVEL_ARRAY = Object.values(VIP_PACKAGE_LEVEL);

export const STATUS_ORDER = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};
