---
description: How to get a MongoDB Connection URI (Atlas or Local)
---

# How to get a MongoDB URI

You have two main options: **MongoDB Atlas (Cloud)** or **Local MongoDB**.

## Option 1: MongoDB Atlas (Recommended for Production/Cloud)

1.  **Create an Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up.
2.  **Create a Cluster**:
    -   Click **+ Create**.
    -   Select **M0 Sandbox** (Free Tier).
    -   Choose a provider (AWS) and region (e.g., Mumbai).
    -   Click **Create Deployment**.
3.  **Create a Database User**:
    -   Go to **Security** -> **Database Access**.
    -   Click **+ Add New Database User**.
    -   Enter a **Username** and **Password** (Remember these!).
    -   Click **Add User**.
4.  **Allow Network Access**:
    -   Go to **Security** -> **Network Access**.
    -   Click **+ Add IP Address**.
    -   Select **Allow Access from Anywhere** (0.0.0.0/0) for development ease.
    -   Click **Confirm**.
5.  **Get Connection String**:
    -   Go to **Deployment** -> **Database**.
    -   Click **Connect** on your cluster.
    -   Select **Drivers**.
    -   Copy the connection string. It looks like:
        `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
    -   Replace `<username>` and `<password>` with the user you created in step 3.

## Option 2: Local MongoDB (Recommended for Offline Dev)

1.  **Download**: Download [MongoDB Community Server](https://www.mongodb.com/try/download/community).
2.  **Install**: Run the installer.
3.  **Start Server**: It usually runs automatically as a service.
4.  **Connection String**:
    -   The default URI is usually: `mongodb://localhost:27017/ignouiq`
    -   (Replace `ignouiq` with your preferred database name).

## Next Steps
Paste your URI into the `.env` file in the project root:
```env
MONGODB_URI=your_connection_string_here
```
