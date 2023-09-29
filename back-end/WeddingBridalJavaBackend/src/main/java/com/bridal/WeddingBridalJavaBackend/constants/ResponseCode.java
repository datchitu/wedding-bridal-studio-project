package com.bridal.WeddingBridalJavaBackend.constants;

public enum ResponseCode {
    SUCCESS(200, "OK"),
    NOT_FOUND(404, "Not found"),
    NO_PARAM(6001, "No param"),
    NO_CONTENT(2004, "No content"),
    VARIANT_SERVICE_IS_DELETED(2005, "Variant service is deleted"),
    DELETED(2006, "Is deleted"),
    PAID(2007,"Is paid"),
    ACTIVED(2008, "Is actived"),
    COMPLETE(2010,"Is complete"),
    INTERNAL_SERVER_ERROR(5000, "Internal server error"),
    USER_NOT_FOUND(4005, "User not found"),
    CATEGORY_NOT_FOUND(4006, "Category not found"),
    SERVICE_NOT_FOUND(4007, "Service not found"),
    VARIANT_SERVICE_NOT_FOUND(4008, "Variant service not found"),
    TRANSACTION_LINE_ITEM_NOT_FOUND(4009, "Transaction line item not found"),
    TRANSACTION_NOT_FOUND(4010, "Transaction not found"),
    VOUCHER_NOT_FOUND(4012, "Voucher not found"),
    TRANSACTION_USER_NOT_FOUND(4013, "Transaction user not found"),
    VALUE_LESS_THAN_ZERO(4014, "Value less than zero"),
    DUPLICATE_OLD_PASSWORD(4015, "Duplicate old password"),
    PASSWORD_NOT_MATCH(4016, "Password not match"),
    VALUE_LESS_THAN_ONE(4017, "Value less than one  "),
    OUT_OF_QUANTITY(5001, "Out of quantity"),
    EXPIRED_VOUCHER(5002, "Expired voucher"),
    BEFORE_TODAY(5003, "Date before today"),
    FAILED_LOGIN(3000, "Failed login"),
    INVALID_VALUE(3001, "Invalid value"),
    DATA_ALREADY_EXISTS(2023, "Data already exists");

    private int code;
    private String message;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    private ResponseCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
