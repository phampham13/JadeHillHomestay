// Cắt và ghép vào main 3 cái api và 1 cái schema ở cuối cùng
/**
 Khi chạy, vào link http://localhost:8000/api-docs/ để mở Swagger
 Khi thêm 1 api mới vào swagger cần làm:
 - Thêm đường dẫn vào phần path, thêm các trường thông tin tương tự như mẫu dưới đây
 - Thêm schema trong phần component, để hiển thị mẫu trong phần request body
 */
/**
 "đường dẫn": {
                    "post": {
                        "tags": [" tên"],
                        "summary": "hướng dẫn",
                        "operationId": "định danh",
                        "parameters": [],
                        "requestBody": {
                            "description": "mô tả",
                            "content": { //Tham chiếu tới schema
                                "application/json": {"schema": {"$ref": "#/components/schemas/Users"}},
                                "application/xml": {"schema": {"$ref": "#/components/schemas/Users"}}
                            },
                            "required": true
                        },
                        "responses": {
                            "200": {"description": "create_document_success"},
                            "400": {"description": "create_document_false", "content": {}}
                        },
                        "x-codegen-request-body-name": "body"
                    }
                },
 */

const swaggerJsonData =
    {
        "openapi": "3.0.3",
        "info": {
            "title": "Api NMCNMP",
            "description": "Chứa danh sách các Api và test",
            "contact": {"email": "minhctthvn2@gmail.com"},
            "version": "1.0.5"
        },
        "servers": [{"url": "http://localhost:8000"}],
        "tags": [ {
            "name": "Authentication",
            "description": "Api module Authentication"
        },{
            "name":"Admin",
            "description": "Api module Admin"
        }],
        "paths": {
            "/auth/login": {
                "post": {
                    "tags": ["Authentication"],
                    "summary": "Log in with role admin or super admin",
                    "operationId": "Login",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập thông tin tài khoản admin hoặc super admin",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/Users"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/Users"}}
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {"description": "login success"},
                        "400": {"description": "login false", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/auth/logout": {
                "post": {
                    "tags": ["Authentication"],
                    "summary": "Log out account",
                    "operationId": "LogoutAuth",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập thông tin tài khoản ",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/Logout DTO"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/Logout DTO"}}
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {"description": "logout success"},
                        "400": {"description": "logout false", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/homestays/ranking": {
                "get": {
                    "tags": ["Homestays"],
                    "summary": "Get top ${quantity} ranking homestays",
                    "operationId": "RankingHomestays",
                    "parameters": [{
                        "in": "query",
                        "name": "quantity",
                        "schema": {
                            "type": "integer"
                        },
                        "require": true
                    }],
                    "responses": {
                        "200": {"description": "get ranking homestays success"},
                        "400": {"description": "get ranking homestays false", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/homestays/rate/:id": {
                "post": {
                    "tags": ["Homestays"],
                    "summary": "Create new rate",
                    "operationId": "CreateRate",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập thông tin rate và id của homestay",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/Rate"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/Rate"}}
                        },
                        "x-codegen-request-body-name": "body"
                    },
                    "responses": {
                        "200": {"description": "Rate thành công "},
                        "400": {"description": "Rate không thành công ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                },
            },
            "/homestays/information/{id}": {
                "get": {
                    "tags": ["Homestays"],
                    "summary": "Get full infomation about a homestay with id",
                    "operationId": "getAHomestay",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "Nhập id của homestay cần lấy ra thông tin chi tiết",
                        "schema": {"type": "string"},
                        "require": true
                    }],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "lấy dữ liệu homestay thành công "},
                        "400": {"description": "id không đúng ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/homestays/filter": {
                "get": {
                    "tags": ["Homestays"],
                    "summary": "Filter homestays by information",
                    "operationId": "filterHomestays",
                    "parameters": [
                        {  "name": "province",
                            "in": "query",
                            "schema": {"type": "string"},
                           "require": false},
                        {
                            "name": "type",
                            "in": "query",
                            "schema": {"type": "string"},
                            "require": false},
                        {
                            "name": "averageRates",
                            "in": "query",
                            "schema": {"type": "number"},
                            "require": false},
                        {
                            "name": "amenities",
                            "in": "query",
                            "schema":{
                                "type":"array",
                                "items": {
                                    "type":"string",
                                },
                                "minItems":0
                            },
                            "require": false},
                        {
                            "name": "generalServices",
                            "in": "query",
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                },
                                "minItems":0
                            },
                            "require": false},
                        {
                            "name": "minPrice",
                            "in": "query",
                            "schema": {"type": "number"},
                            "require": false},
                        {
                            "name": "maxPrice",
                            "in": "query",
                            "schema": {"type": "number"},
                            "require": false},
                        {
                            "name": "slice",
                            "in": "query",
                            "schema": {"type": "number"},
                            "require": false},
                    ],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "Filter thành công "},
                        "400": {"description": "Filter có lỗi ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/homestays/update":{
                "put": {
                    "tags": ["Homestays"],
                    "summary":"Hoàng: Update information in Homestay with _id",
                    "operationId":"updateHomestay",
                    "parameters":[],
                    "requestBody": {
                        "description": "Nhập thông tin homestay muốn thay đổi",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/UpdateHomestay"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/UpdateHomestay"}}
                        },
                    },
                    "responses": {
                        "200": {"description": "Update homestay success"},
                        "400": {"description": "Exception"},
                    },
                    "x-codegen-request-body-name": "body"
                },
            },
            "/admins/bills-of-admin/{id}": {
                "get": {
                    "tags": ["Admin"],
                    "summary": "Get bills of admin by admin 's id",
                    "operationId": "getBillsOfAdmin",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "Nhập id của admin cần lấy ra danh sách các bills",
                        "schema": {"type": "string"},
                        "require": true
                    }],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "lấy dữ liệu thành công "},
                        "400": {"description": "admin 's id không đúng ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/admins/bills-of-homestay": {
                "get": {
                    "tags": ["Admin"],
                    "summary": "Get bills of admin by Homestay 's id",
                    "operationId": "getBillsOfHomestay",
                    "parameters": [{
                        "name": "id",
                        "in": "query",
                        "description": "Nhập id của Homestay cần lấy ra danh sách các bills",
                        "schema": {"type": "string"},
                        "require": true
                    }, {
                        "name": "status",
                        "in": "query",
                        "description": "Nhập id của Homestay cần lấy ra danh sách các bills",
                        "schema": {"type": "number"},
                        "require": true
                    }],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "lấy dữ liệu thành công "},
                        "400": {"description": "Homestay 's id không đúng ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/admins/update/bills":{
                "put": {
                    "tags": ["Admin"],
                    "summary": "Update Bills by admin",
                    "operationId": "updateBillsByAdmin",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập những trường cần cập nhật của bills",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/UpdateBill"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/UpdateBill"}}
                        },
                    },
                    "responses": {
                        "200": {"description": "Update bills thành công "},
                        "400": {"description": "Update bill không thành công", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/users/create/bills":{
                "post": {
                    "tags": ["Users"],
                    "summary": "Create Bills by admin",
                    "operationId": "createBillsByAdmin",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập những trường cần tạo của bills",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/CreateBill"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/CreateBill"}}
                        },
                    },
                    "responses": {
                        "200": {"description": "Create bills thành công "},
                        "400": {"description": "Create bill không thành công", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/admins/delete/bills/{id}":{
                "delete": {
                    "tags": ["Admin"],
                    "summary": "Delete bills by admin",
                    "operationId": "deleteBillsByAdmin",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "Nhập id của bill cần xóa",
                        "schema": {"type": "string"},
                        "require": true
                    }],
                    "requestBody": {
                        "description": "Nhập những id của bills cần xóa",
                        "content": {},
                    },
                    "responses": {
                        "200": {"description": "Delete bills thành công "},
                        "400": {"description": "Delete bill không thành công", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/update/admins":{
                "put": {
                    "tags": ["Super Admins"],
                    "summary": "Update admins by super admin",
                    "operationId": "updateAdminsById",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập những trường cần cập nhật của admins",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/UpdateAdmin"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/UpdateAdmin"}}
                        },
                    },
                    "responses": {
                        "200": {"description": "Update admin thành công "},
                        "400": {"description": "Update admin không thành công", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/create/admins":{
                "post": {
                    "tags": ["Super Admins"],
                    "summary": "Create admins by super admin",
                    "operationId": "createAdmins",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập những trường cần cập nhật của admins",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/CreateAdmin"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/CreateAdmin"}}
                        },
                    },
                    "responses": {
                        "200": {"description": "Create admin successful "},
                        "400": {"description": "Create admin unsuccessful", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/create/homestays":{
                "post": {
                    "tags":["Super Admins"],
                    "summary": "Hoàng: Create homestay by super admin",
                    "operationId": "createHomestays",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập id admin, tên homestay và tỉnh",
                        "content": {
                            "multipart/form-data ": {
                                "schema" :
                                    {
                                        "type": "object",
                                        "properties" : {
                                            "test" : {
                                                "type": "array",
                                                "items": {
                                                    "type": "string",
                                                    "format": "binary"
                                                }
                                            }
                                        }
                                    }
                            },
                            "application/json": {"schema": {"$ref": "#/components/schemas/CreateHomestay"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/CreateHomestay"}}
                        },
                    },
                    "responses": {
                        "200": {"description": "Create homestay successful "},
                        "400": {"description": "Create homestay fail", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/getIdAdmin":{
                "post":{
                    "tags":["Super Admins"],
                    "summary": "Hoàng: Get IdAdmin by province",
                    "operationId": "GetIdAdmin",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập tên tỉnh",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/GetIdAdmin"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/GetIdAdmin"}}
                        },
                    },
                    "responses": {
                        "200": {"description": "Get IdAdmin successful", "content":{}},
                        "400": {"description": "Get IdAdmin fail", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/homestays":{
                "get": {
                    "tags":["Super Admins"],
                    "summary": "Get all homestays by super admin",
                    "operationId": "getAllHomestays",
                    "parameters": [{
                        "name": "page",
                        "in": "query",
                        "description": "Nhập page (đang ở page nào) nếu không nhập sẽ lấy tất cả các homestays",
                        "schema": {"type": "number"},
                        "require": false
                    }, {
                        "name": "perPage",
                        "in": "query",
                        "description": "Nhập perPage (mỗi page cần bao nhiêu homestays) nếu không nhập sẽ lấy tất cả các homestays",
                        "schema": {"type": "number"},
                        "require": false
                    }],
                    "requestBody": {},
                    "responses": {
                        "200": {"description": "Get homestays successful "},
                        "400": {"description": "Get homestays fail", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/assign-homestay": {
                "post": {
                    "tags": ["Super Admins"],
                    "summary": "Assign a homestay to an admin",
                    "operationId": "assignHomestayToAdmin",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập thông tin id của admin và homestay",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/AssignHomestay"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/AssignHomestay"}}
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {"description": "Gán homestay cho admin thành công "},
                        "400": {"description": "không thành công ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/unassign-homestay": {
                "post": {
                    "tags": ["Super Admins"],
                    "summary": "Unassign a homestay to an admin",
                    "operationId": "unassignHomestayToAdmin",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập thông tin id của admin và homestay",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/AssignHomestay"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/AssignHomestay"}}
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {"description": "Bỏ gán homestay cho admin thành công "},
                        "400": {"description": "Không thành công ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/delete/admin/{id}": {
                "delete": {
                    "tags": ["Super Admins"],
                    "summary": "Delete an admin with id",
                    "operationId": "deleteAdmin",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "Nhập id của admin cần xóa",
                        "schema": {"type": "string"},
                        "require": true
                    }],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "xóa thành công "},
                        "400": {"description": "id không đúng ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/delete/homestay/{id}": {
                "delete": {
                    "tags": ["Super Admins"],
                    "summary": "Delete a homestay with id",
                    "operationId": "deleteAHomestay",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "Nhập id của homestay cần xóa",
                        "schema": {"type": "string"},
                        "require": true
                    }],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "xóa homestay thành công "},
                        "400": {"description": "id không đúng ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/get/admins": {
                "get": {
                    "tags": ["Super Admins"],
                    "summary": "Get all admins",
                    "operationId": "getAdmins",
                    "parameters": [],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "Lấy danh sách admins thành công"},
                        "400": {"description": "Error", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/get/admin/{id}": {
                "get": {
                    "tags": ["Super Admins"],
                    "summary": "Get an admin 's information with id",
                    "operationId": "infoAdmin",
                    "parameters": [{
                        "name": "id",
                        "in": "path",
                        "description": "Nhập id của admin cần lấy thông tin chi tiết",
                        "schema": {"type": "string"},
                        "require": true
                    }],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "lấy thành công "},
                        "400": {"description": "id không đúng ", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/revenue/total?year={year}": {
                "get": {
                    "tags": ["Super Admins"],
                    "sumary": "Super admin total revenue statistics",
                    "operationId": "totalRevenueStatistics",
                    "parameters": [{
                        "name": "year",
                        "in": "query",
                        "description": "Nhập năm cần thống kê",
                        "schema": {"type": "string"},
                        "require": true
                    }],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "Get total revenue statistics successfully","content":{}},
                        "400": {"description": "Error", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/super-admins/revenue/homestay?year={year}&homestayId={homestayId}": {
                "get": {
                    "tags": ["Super Admins"],
                    "sumary": "Super admin total revenue statistics",
                    "operationId": "totalRevenueStatistics",
                    "parameters": [
                    {
                        "name": "year",
                        "in": "query",
                        "description": "Nhập năm cần thống kê",
                        "schema": {"type": "string"},
                        "require": true,
                    },
                    {
                        "name": "homestayId",
                        "in": "query",
                        "description": "Nhập id homestay cần thống kê",
                        "schema": {"type": "string"},
                        "require": true
                    }
                    ],
                    "requestBody": [],
                    "responses": {
                        "200": {"description": "Get revenue statistics successfully","content":{}},
                        "400": {"description": "Error", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/services": {
                "get": {
                    "tags": ["Admin"],
                    "summary": "Get all services",
                    "operationId": "GetServices",
                    "parameters": [],
                    "responses": {
                        "200": {"description": "get ranking homestays success"},
                        "400": {"description": "get ranking homestays false", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
            "/services/create": {
                "post": {
                    "tags": ["Admin"],
                    "summary": "create new service",
                    "operationId": "PostService",
                    "parameters": [],
                    "requestBody": {
                        "description": "Nhập những trường cần cập nhật của admins",
                        "content": {
                            "application/json": {"schema": {"$ref": "#/components/schemas/CreateService"}},
                            "application/xml": {"schema": {"$ref": "#/components/schemas/CreateService"}}
                        },
                    },
                    "responses": {
                        "200": {"description": "create new service success"},
                        "400": {"description": "create new service false", "content": {}}
                    },
                    "x-codegen-request-body-name": "body"
                }
            },
        },
        "components": {
            "schemas": {
                "CreateService": {
                    "type": "object", "properties": {
                        "name":  {"type": "string"},
                        "pricePerUnit": {"type": "number"},
                        "personServe": {"type": "number"},
                    }
                },
                "Users": {
                    "type": "object", "properties": {
                        "email":  {"type": "string"},
                        "password": {"type": "string"},
                    }
                },
                "Logout DTO": {
                    "type": "object", "properties": {
                        "_id": {"type": "string"},
                    }
                },
                "Rate": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string"
                        },
                        "rate": {
                            "type": "object",
                            "properties": {
                                "cleanRate": {
                                    "type": "number"
                                },
                                "serviceRate": {
                                    "type": "number"
                                },
                                "valueRate": {
                                    "type": "number"
                                },
                                "accuracyRate": {
                                    "type": "number"
                                },
                                "description": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "UpdateHomestay":{
                    "type": "object", "properties":{
                        "_id":         {"type": "string"},
                        "name":        {"type": "string"},
                        "price":       {"type": "number"},
                        "type":        {"type": "string"},
                        "address":     {"type": "string"},
                        "province":    {"type": "string"},
                        "district":    {"type": "string"},
                        "latitude":    {"type": "string"},
                        "longitude":   {"type": "string"},
                        "area":        {"type": "string"},
                        "description": {"type": "string"},
                        "available":   {"type": "number"},
                        "services":{
                            "type":"array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "generalServices":{
                            "type":"array",
                            "items": {
                                "type": "object", "properties": {
                                    "name": {"type": "string"}
                                }
                            }
                        },
                        "amenities":{
                            "items": {
                                "type": "object", "properties": {
                                    "name": {"type": "string"},
                                    "type": {"type": "string"}
                                }
                            }
                        },
                        "photos":{
                            "type":"array",
                            "items": {
                                "type": "string",
                            }
                        }
                    }
                },
                "CreateHomestay":{
                    "type": "object", "properties":{
                        "adminId":     {"type": "string"},
                        "name":        {"type": "string"},
                        "price":       {"type": "number"},
                        "type":        {"type": "string"},
                        "address":     {"type": "string"},
                        "province":    {"type": "string"},
                        "district":    {"type": "string"},
                        "latitude":    {"type": "string"},
                        "longitude":   {"type": "string"},
                        "area":        {"type": "string"},
                        "description": {"type": "string"},
                        "available":   {"type": "number"},
                        "services":{
                            "type":"array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "generalServices":{
                            "type":"array",
                            "items": {
                                "type": "object", "properties": {
                                    "name": {"type": "string"}
                                }
                            }
                        },
                        "amenities":{
                            "items": {
                                "type": "object", "properties": {
                                    "name": {"type": "string"},
                                    "type": {"type": "string"}
                                }
                            }
                        },
                        "photos":{
                            "type":"array",
                            "items": {
                                "type": "string",
                            }
                        }
                    }
                },
                "UpdateBill":{
                    "type": "object", "properties":{
                        "_id": {
                            "type": "string",
                        },
                        "customer":{
                            "type":"object",
                            "properties" :{
                                "name": {"type": "string"},
                                "identification": {"type": "string"},
                                "email": {"type": "string"},
                                "phoneNumber": {"type": "string"},
                                "age": {"type": "number", "default": 20},
                            }
                        },
                        "customerTogether": {
                            "type":"array",
                            "items":{
                                "type": "object",
                                "properties":{
                                    "name":        {"type": "string"},
                                    "age":        {"type": "number"},
                                }
                            }
                        },
                        "checkinDate": {"type": "string"},
                        "checkoutDate": {"type": "string"},
                        "status": {"type": "number"},
                        "servicesPerBill": {
                            "type":"array",
                            "items":{
                                "type": "object",
                                "properties":{
                                    "services":        {"type": "string"},
                                    "count":        {"type": "number"},
                                }
                            }
                        },
                    }
                },
                "CreateBill":{
                    "type": "object", "properties":{
                        "customer":{
                            "type":"object",
                            "properties" :{
                                "name": {"type": "string"},
                                "identification": {"type": "string"},
                                "email": {"type": "string"},
                                "phoneNumber": {"type": "string"},
                                "age": {"type": "number", "default": 20},
                            }
                        },
                        "customerTogether": {
                            "type":"array",
                            "items":{
                                "type": "object",
                                "properties":{
                                    "name":        {"type": "string"},
                                    "age":        {"type": "number"},
                                }
                            }
                        },
                        "_id": {"type": "string"},
                        "checkinDate": {"type": "string"},
                        "checkoutDate": {"type": "string"},
                        "status": {"type": "number"},
                        "servicesPerBill": {
                            "type":"array",
                            "items":{
                                "type": "object",
                                "properties":{
                                    "services":        {"type": "string"},
                                    "count":        {"type": "number"},
                                }
                            }
                        },
                    }
                },
                "UpdateAdmin":{
                    "type": "object", "properties":{
                        "id": {
                            "type": "string",
                        },
                        "name":  {
                            "type": "string",
                        },
                        "address":  {
                            "type": "string",
                        },
                        "role":  {
                            "type": "string",
                            "default": "admin"
                        },
                        "email":  {
                            "type": "string",
                        },
                        "password":  {
                            "type": "string",
                        },
                        "phone":  {
                            "type": "string",
                        },
                        "status":  {
                            "type": "number",
                            "default": 1
                        },
                        "gender":  {
                            "type": "string",
                            "default": "Male"
                        },
                        "identification":  {
                            "type": "string",
                        },
                        "avatarUrl":  {
                            "type": "string",
                        },
                        "dateAtWork":  {
                            "type": "string",
                            "default": "12-25-2019"
                        },
                        "dateAtBirth":  {
                            "type": "string",
                            "default": "12-20-2001"
                        },
                        "homestays":  {
                            "type": "array",
                            "items": {
                                "type": "string",
                            }
                        },
                    }
                },
                "CreateAdmin":{
                    "type": "object", "properties":{
                        "name":  {
                            "type": "string",
                        },
                        "address":  {
                            "type": "string",
                        },
                        "role":  {
                            "type": "string",
                            "default": "admin"
                        },
                        "email":  {
                            "type": "string",
                        },
                        "password":  {
                            "type": "string",
                        },
                        "phone":  {
                            "type": "string",
                        },
                        "status":  {
                            "type": "number",
                            "default": 1
                        },
                        "gender":  {
                            "type": "string",
                            "default": "Male"
                        },
                        "identification":  {
                            "type": "string",
                        },
                        "avatarUrl":  {
                            "type": "string",
                        },
                        "dateAtWork":  {
                            "type": "string",
                            "default": "12-11-2021"
                        },
                        "dateAtBirth":  {
                            "type": "string",
                            "default": "12-20-2001"
                        },
                        "homestays":  {
                            "type": "array",
                            "items": {
                                "type": "string",
                            }
                        },
                    }
                },
                "AssignHomestay": {
                    "type": "object", "properties": {
                        "adminId": { "type": "string" },
                        "homestayId": { "type": "string" }
                    }
                },
                "GetIdAdmin":{
                    "type": "object", "properties":{
                        "province":    {"type": "string"},
                    }
                }

            }, "securitySchemes": {"bearerAuth": {"type": "http", "scheme": "bearer", "bearerFormat": "JWT"}}
        },
        "security": [{"bearerAuth": []}]
    }

exports.swaggerJsonData = swaggerJsonData;

