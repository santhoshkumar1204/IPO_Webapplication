# IPO Platform API Documentation

## 🚀 Backend Complete - All Tasks Accomplished!

✅ **Task 3: Backend Development - Django** - COMPLETED  
✅ **Task 5: Database Design & Dummy Data** - COMPLETED  
✅ **Task 10: REST API Development & JWT** - COMPLETED  
✅ **Ready for Task 2: API Testing in Postman** - READY  

---

## 🏗️ **Complete IPO Platform Backend**

### **Server Information**
- **Base URL:** `http://localhost:8000`
- **Database:** SQLite (ipo_db.sqlite3)
- **Authentication:** JWT Token + Session + Token Auth
- **Admin Panel:** `http://localhost:8000/admin/`
- **Admin User:** `admin` / `admin123`

---

## 🔐 **Authentication Endpoints**

### **1. User Registration**
```http
POST /api/auth/register/
Content-Type: application/json

{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securepass123",
    "first_name": "Test",
    "last_name": "User"
}
```

**Response:**
```json
{
    "message": "User created successfully",
    "user": {
        "id": 2,
        "username": "testuser",
        "email": "test@example.com",
        "first_name": "Test",
        "last_name": "User",
        "date_joined": "2024-01-15T10:30:00Z",
        "is_staff": false
    }
}
```

### **2. Login (Get JWT Token)**
```http
POST /api/auth/login/
Content-Type: application/json

{
    "username": "admin",
    "password": "admin123"
}
```

**Response:**
```json
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### **3. Refresh Token**
```http
POST /api/auth/refresh/
Content-Type: application/json

{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### **4. User Profile**
```http
GET /api/profile/
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

---

## 🏢 **IPO Management Endpoints**

### **5. Get All IPOs**
```http
GET /api/ipos/
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `status`: upcoming, open, closed, listed, cancelled
- `sector`: Filter by sector ID
- `search`: Search company name, sector, or lead managers
- `ordering`: ipo_open_date, -ipo_open_date, company_name
- `open_from`: Filter by open date from (YYYY-MM-DD)
- `open_to`: Filter by open date to (YYYY-MM-DD)

**Example Response:**
```json
{
    "count": 5,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "company_name": "TechNova Solutions",
            "company_logo": null,
            "sector": 1,
            "sector_name": "Technology",
            "ipo_open_date": "2024-02-15",
            "ipo_close_date": "2024-02-17",
            "price_band_min": "250.00",
            "price_band_max": "265.00",
            "price_band": "₹250.00 - ₹265.00",
            "lot_size": 56,
            "total_issue_size": 5000000000,
            "fresh_issue": 3000000000,
            "offer_for_sale": 2000000000,
            "rhp_link": "https://example.com/rhp/technova-solutions.pdf",
            "listing_date": null,
            "status": "upcoming",
            "lead_managers": "ICICI Securities, Kotak Mahindra Capital",
            "registrar": "Link Intime India",
            "market_maker": "",
            "retail_subscription": "0.00",
            "qib_subscription": "0.00",
            "nii_subscription": "0.00",
            "listing_price": null,
            "listing_gains": null,
            "is_open": false,
            "days_remaining": 5,
            "created_at": "2024-01-15T10:30:00Z",
            "updated_at": "2024-01-15T10:30:00Z",
            "created_by_username": null,
            "is_active": true
        }
    ]
}
```

### **6. Get Upcoming IPOs Only**
```http
GET /api/ipos/upcoming/
Authorization: Bearer <access_token>
```

### **7. Get Currently Open IPOs**
```http
GET /api/ipos/open_now/
Authorization: Bearer <access_token>
```

### **8. Get IPO Statistics**
```http
GET /api/ipos/statistics/
Authorization: Bearer <access_token>
```

**Response:**
```json
{
    "total_ipos": 5,
    "upcoming_ipos": 3,
    "open_ipos": 1,
    "closed_ipos": 0,
    "listed_ipos": 1,
    "avg_listing_gains": 11.76
}
```

### **9. Create New IPO (Admin Only)**
```http
POST /api/ipos/
Authorization: Bearer <access_token>
Content-Type: application/json

{
    "company_name": "New Tech Company",
    "sector": 1,
    "ipo_open_date": "2024-03-01",
    "ipo_close_date": "2024-03-03",
    "price_band_min": "300.00",
    "price_band_max": "320.00",
    "lot_size": 50,
    "total_issue_size": 4000000000,
    "fresh_issue": 2500000000,
    "offer_for_sale": 1500000000,
    "rhp_link": "https://example.com/rhp/new-tech.pdf",
    "status": "upcoming",
    "lead_managers": "Goldman Sachs, Morgan Stanley",
    "registrar": "KFin Technologies"
}
```

### **10. Get Single IPO**
```http
GET /api/ipos/{id}/
Authorization: Bearer <access_token>
```

### **11. Update IPO (Admin Only)**
```http
PUT /api/ipos/{id}/
Authorization: Bearer <access_token>
Content-Type: application/json
```

### **12. Delete IPO (Admin Only)**
```http
DELETE /api/ipos/{id}/
Authorization: Bearer <access_token>
```

---

## 🏭 **Sector Management Endpoints**

### **13. Get All Sectors**
```http
GET /api/sectors/
Authorization: Bearer <access_token>
```

### **14. Create Sector (Admin Only)**
```http
POST /api/sectors/
Authorization: Bearer <access_token>
Content-Type: application/json

{
    "name": "Blockchain",
    "description": "Blockchain and Cryptocurrency companies"
}
```

---

## 📝 **IPO Application Endpoints**

### **15. Get User Applications**
```http
GET /api/applications/
Authorization: Bearer <access_token>
```

### **16. Apply for IPO**
```http
POST /api/applications/
Authorization: Bearer <access_token>
Content-Type: application/json

{
    "ipo": 1,
    "bid_price": "260.00",
    "quantity": 2,
    "total_amount": "29120.00"
}
```

---

## 📊 **API Overview**
```http
GET /api/
```

---

## 🧪 **Postman Testing Collection**

### **Environment Variables**
```
base_url: http://localhost:8000
access_token: {{your_jwt_token}}
```

### **Test Sequence:**
1. **Register User** → Save user details
2. **Login** → Save `access_token` and `refresh_token`
3. **Get IPO Statistics** → Verify data
4. **Get All IPOs** → Test filtering and pagination
5. **Get Upcoming IPOs** → Test specific endpoint
6. **Get Open IPOs** → Test real-time status
7. **Apply for IPO** → Test application creation
8. **Get User Applications** → Verify application
9. **Create IPO** (Admin) → Test admin functionality
10. **Get Sectors** → Test sector management

### **Sample Test Scripts**

**For Login Request:**
```javascript
// Tests tab in Postman
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has access token", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.access).to.be.a('string');
    pm.environment.set("access_token", jsonData.access);
});
```

**For IPO List Request:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has results array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.results).to.be.an('array');
    pm.expect(jsonData.results.length).to.be.greaterThan(0);
});

pm.test("IPO has required fields", function () {
    var jsonData = pm.response.json();
    var ipo = jsonData.results[0];
    pm.expect(ipo).to.have.property('company_name');
    pm.expect(ipo).to.have.property('price_band');
    pm.expect(ipo).to.have.property('status');
});
```

---

## 🔍 **Search and Filter Examples**

### **Search by Company Name:**
```http
GET /api/ipos/?search=TechNova
```

### **Filter by Status:**
```http
GET /api/ipos/?status=upcoming
```

### **Filter by Sector:**
```http
GET /api/ipos/?sector=1
```

### **Filter by Date Range:**
```http
GET /api/ipos/?open_from=2024-02-01&open_to=2024-02-28
```

### **Combined Filters:**
```http
GET /api/ipos/?status=upcoming&sector=1&search=Tech&ordering=-ipo_open_date
```

---

## 🚨 **Error Handling**

### **401 Unauthorized**
```json
{
    "detail": "Authentication credentials were not provided."
}
```

### **403 Forbidden**
```json
{
    "detail": "You do not have permission to perform this action."
}
```

### **400 Bad Request**
```json
{
    "field_name": ["This field is required."]
}
```

---

## 📋 **Data Models**

### **IPO Model Fields:**
- `company_name` (string, required)
- `company_logo` (URL, optional)
- `sector` (foreign key to Sector)
- `ipo_open_date` (date, required)
- `ipo_close_date` (date, required)
- `price_band_min` (decimal, required)
- `price_band_max` (decimal, required)
- `lot_size` (integer, required)
- `total_issue_size` (big integer, required)
- `fresh_issue` (big integer, default 0)
- `offer_for_sale` (big integer, default 0)
- `rhp_link` (URL, required)
- `listing_date` (date, optional)
- `status` (choice: upcoming/open/closed/listed/cancelled)
- `lead_managers` (text)
- `registrar` (string)
- `listing_price` (decimal, optional)
- `listing_gains` (decimal, optional)

### **Computed Fields:**
- `price_band` (formatted string)
- `is_open` (boolean)
- `days_remaining` (integer)

---

## 🎯 **Next Steps for Frontend Integration**

1. **Authentication Flow:** Use JWT tokens for all API calls
2. **IPO Listing Page:** Use `/api/ipos/upcoming/` endpoint
3. **Search & Filters:** Implement using query parameters
4. **Admin Dashboard:** Use CRUD endpoints for IPO management
5. **User Applications:** Track user IPO applications
6. **Real-time Status:** Use `is_open` and `days_remaining` fields

---

## ✅ **Backend Development Status: COMPLETE**

**All Tasks Accomplished:**
- ✅ Complete IPO Platform Backend
- ✅ JWT Authentication System
- ✅ CRUD Operations for IPOs
- ✅ Search, Filter, and Pagination
- ✅ User Application Tracking
- ✅ Admin Role Management
- ✅ Realistic Dummy Data
- ✅ Comprehensive API Documentation
- ✅ Ready for Postman Testing
- ✅ Frontend Integration Ready

**Ready for:**
- 🧪 **Task 2:** API Testing in Postman
- 🎨 **Task 7:** Frontend Development
- 🐛 **Task 4:** Bug Fixing & Testing
- 🚀 **Task 6:** Deployment Preparation