export enum LANGUAGE_CONSTANTS {
  ENGLISH = 'en',
  FRENCH = 'fr',
}

export class Constants {
  public static storageKeys = {
    selectedLanguage: 'selectedLanguage',
    currentUser: 'currentUser',
    token: 'token'
  };

  public static DiscountType = [
    { value: 0, viewValue: 'Percentage' },
    { value: 1, viewValue: 'Flat' },
  ];

  public static DiscountOn = [
    { value: 0, viewValue: 'Quantity' },
    { value: 1, viewValue: 'Amount' },
  ];


  public static EventTypeOption = [
    { value: 0, viewValue: 'Full Time' },
    { value: 1, viewValue: 'Slot-wise' },
  ];

  public static SlotSection = [
    { value: true, viewValue: 'Repeat' },
    { value: false, viewValue: 'Does Not Repeat' },
  ];

  public static APIRoutes = {
    userLogin: 'auth/client_login',
    getEventList: 'cap/event/list/map',
    getDiscountList: 'cap/discount/list',
    deleteDiscount: 'cap/discount/delete/',
    getDiscountById: 'cap/discount/retrieve/',
    getStaffList: 'cap/staff/list',
    updateStaffStatus: 'cap/staff/status/update/',
    getRoleList: 'cap/role/list',
    getStaffById: 'cap/staff/retrieve/',
    staffCreateApi: 'cap/staff/create',
    staffUpdateApi: 'cap/staff/update/',
    deleteStaffApi: 'cap/staff/delete/',
    deleteEvent: 'cap/event/delete/',
    getEventById: 'cap/event/retrieve/',
    getAmenitiesList: 'cap/amenities',
    createEvent: 'cap/event/create',
    updateEvent: 'cap/event/update/',

    checkFeaturedImage: 'cap/event/section/check',

    userForgotPassword: 'forgotPassword',
    userResetPassword: 'resetPassword/',
    userUpdatePassword: 'settings/updatePassword/',
    getUserProfile: 'settings/adminProfile/',
    updateUserProfile: 'settings/updateAdminProfile/',

    getCategoryList: 'category/getCategory/',
    createCategory: 'category/createCategory/',
    deleteCategory: 'category/deleteCategory/',
    getSingleCategory: 'category/getSingleCategory/',
    updateCategory: 'category/updateCategory/',

    getArchiveList: 'archives/getArchives/',
    createArchive: 'archives/createArchive/',
    updateArchive: 'archives/updateArchive/',
    deleteArchive: 'archives/deleteArchive/',
    getSingleArchives: 'archives/getSingleArchives/',
    getArchivesList: 'archives/allArchives/',
    getCategoriesList: 'category/allCategories/',
  };

  public static generalSettingRoutes = {
    addGeneralSetting: 'settings/addGeneralSettingsFields/',
    getGeneralSetting: 'settings/getAllSettings',
  };

  public static generalConstant = {
    emailPattern:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordPattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
    alphaNumericPattern: /^[ A-Za-z0-9./-]*$/,
    threeDigitInputPattern: /^[0-9][0-9][0-9]\d*$/,
    passwordMinLength: 6,
    passwordMaxLength: 16,
    maxImageSize: 1048576 * 3,
    maxBannerSize: 1048576 * 5,
    maxLengthPattern: 100,
    maxLengthIPTCNumberPattern: 3,
    urlPattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  };

  public static EditorToolbarConfig = [
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    {
      name: 'paragraph',
      groups: ['indent', 'blocks', 'align', 'bidi', 'paragraph'],
    },
    { name: 'styles', groups: ['styles'] },
    { name: 'colors', groups: ['colors'] },
    //  { name: 'tools', groups: ['tools'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
  ];

  public static CkEditorConfig = {
    allowedContent: true,
    autoParagraph: true,
    forcePasteAsPlainText: true,
    toolbarGroups: Constants.EditorToolbarConfig,
  }

  public static AmenitiesOption = [
    { value: true, viewValue: 'Allow' },
    { value: false, viewValue: 'Not Allow' },
  ];

  public static paginationArray = [10, 25, 50, 100];
}

export enum ErrorCode {
  'notFound' = 404,
  'internalServer' = 500,
  'unauthorized' = 401,
  'forbidden' = 403,
}

export enum messageType {
  error = 'error',
  success = 'success',
  info = 'info',
  warning = 'warning',
}

export class MessageConstant {
  public static errorMessage = {
    notFound: 'Page not found',
    internalServer: 'Internal server error',
    unauthorized: 'Authorization token expired',
    passwordUpdatedError: 'Something went wrong when updating your password.',
    connectionTimeOut: 'Something went wrong. Please try again later.',
    maxImageSizeError: 'Image size must be less than 3 MB.',
    selectCustomIconError: 'Please select custom Icon.',
    maxBannerSizeError: 'Image size must be less than 5 MB.',
    invalidForm: 'Please enter all mandatory fields',
    invalidFooterLink: 'Please add atleast one footer link',
    invalidDashboardButton: 'Please provide atleast one button text',
    renewPlanErrorMessage: "Please renew your plan to access the page",
    horizonBannerSize: 'Banner size is invalid',
    verticalBannerSize: 'Banner size is invalid',
    featureBannerSize: 'Banner size is invalid',
    featureImageValidation: 'Feature Image is required',
    venueUrlMissingValidation: 'Please add venue url as you selected online option',
    venueMissingValidation: 'Please select venue for onsite event',
    dateEventNotFound: 'Please select valid date for event',

  };

  public static successMessage = {
    userLoggedIn: 'User Logged in Successfully.',
    userLoggedOut: 'You are successfully logged out.',
    passwordUpdatedSuccess: 'Your Password updated successfully.',
    eventSubmittedSuccessfully: 'Event submitted successfully',
    eventUpdatedSuccessfully: 'Event updated successfully',
    formSubmittedSuccessfully: 'Settings Updated Successfully!',
    mailSentSuccessfully: 'Password reset link sent to your E-mail address successfully.',
    profilePictureRemovedSuccessfully: 'Your profile picture removed successfully.',
    damConfigsChangedSuccessfully: 'Your DAM details are updated successfully. Now, you will be logged out',
    eventCreatedSuccessfully: 'Event created successfully',
  };

  public static PatternValidation = {
    UrlValidation: '(http(s)?:\/\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[A-Za-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)',
  };

  public static ImageType = {
    AcceptFile: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'],
    AcceptType: 'image/jpeg,image/png,image/jpg,image/svg+xml',
    DisplayImageTypes: '.jpg, .jpeg, .png, .svg',
    FaviconIconType: 'image/x-icon',
  };
}

export enum SocialLink {
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedIn',
  FACEBOOK = 'facebook',
  MAIL = 'mail',
}

export const SocialValidators = {
  instagram: /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_]+)/im,
  twitter: /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
  linkedIn: '^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$',
  facebook: '^https://(www|m).facebook.com/(.*)$',
  mail: '/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/',
}
