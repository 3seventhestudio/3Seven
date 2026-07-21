import { useEffect, useState } from "react";

import AccountLayout from "../../../components/account/AccountLayout/AccountLayout";
import ProfileForm from "../../../components/account/ProfileForm/ProfileForm";

import {
    getProfile,
    updateProfile,
} from "../../../services/accountService";

import "./Profile.css";

function Profile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [editing, setEditing] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getProfile();

            setProfile(data);

        } catch (err) {

            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Unable to load profile."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleSave = async (formData) => {

        try {

            setSaving(true);

            await updateProfile(formData);

            await loadProfile();

            setEditing(false);

        } catch (err) {

            console.error(err);

            alert(
                err?.response?.data?.message ||
                "Unable to update profile."
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (
            <AccountLayout title="My Profile">

                <div className="profile-loading">

                    Loading profile...

                </div>

            </AccountLayout>
        );

    }

    if (error) {

        return (
            <AccountLayout title="My Profile">

                <div className="profile-error">

                    {error}

                </div>

            </AccountLayout>
        );

    }

    return (

        <AccountLayout title="My Profile">

            <div className="profile-page">

                <div className="profile-header">

                    <div>

                        <h2>

                            Personal Information

                        </h2>

                        <p>

                            Manage your personal details.

                        </p>

                    </div>

                    {!editing && (

                        <button
                            className="edit-profile-btn"
                            onClick={() =>
                                setEditing(true)
                            }
                        >

                            Edit Profile

                        </button>

                    )}

                </div>

                <ProfileForm
                    profile={profile}
                    editing={editing}
                    saving={saving}
                    onSave={handleSave}
                    onCancel={() => setEditing(false)}
                />

            </div>

        </AccountLayout>

    );

}

export default Profile;