import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Layout from "@/components/layout/Layout";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userRoles } from "@/data";
import {
  addMember,
  fetchMembers,
  resetMemberData,
  setMemberData,
} from "@/redux/organizations/organizationSlice";
import LoadingOverlay from "@/components/common/LoadingOverlay";

const Setting = () => {
  const [copied, setCopied] = useState(false);
  const { organizationDetails, memberData, members, isLoading } = useSelector(
    (state) => state.organizations
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleAddMember = async (e) => {
    e.preventDefault();

    try {
      dispatch(addMember(memberData));
      dispatch(resetMemberData());
    } catch (error) {
      console.error("Failed to add member :", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setMemberData({ [id]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1
          className="text-xl text-[#0E3B65] mb-4 uppercase"
          style={{ fontFamily: "Mukta" }}
        >
          Settings
        </h1>

        <div className="flex flex-row gap-4 items-center">
          <label className="block text-sm font-medium">Public Page URL:</label>
          <div className="flex items-center">
            <h6>
              ${window.location.origin}/organization/{organizationDetails?.slug}
            </h6>
            <CopyToClipboard
              text={`${window.location.origin}/organization/${organizationDetails?.slug}`}
              onCopy={() => setCopied(true)}
            >
              <button className="text-gray-500 px-4 py-2 rounded">
                {copied ? <LuCopyCheck /> : <LuCopy />}
              </button>
            </CopyToClipboard>
          </div>
        </div>

        <form onSubmit={handleAddMember} className="space-y-4 mb-6">
          <Input
            id="userEmail"
            type="email"
            placeholder="Member Email"
            value={memberData.userEmail}
            onChange={handleChange}
            required
          />
          <Input
            id="userName"
            type="text"
            placeholder="Member Name"
            value={memberData.userName}
            onChange={handleChange}
            required
          />
          <select
            id="role"
            value={memberData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Role</option>
            {userRoles.map((roleOption) => (
              <option key={roleOption.value} value={roleOption.value}>
                {roleOption.label}
              </option>
            ))}
          </select>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Member"}
          </Button>
        </form>

        {/* Member List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Members</h2>
          <ul className="space-y-2">
            {members.map((member) => (
              <li
                key={member._id}
                className="flex justify-between p-2 border rounded"
              >
                <div>
                  <span className="font-medium">{member.userName}</span>
                  <span className="text-gray-500 ml-2">{member.userEmail}</span>
                </div>
                <span className="text-gray-600 capitalize">
                  {member.role.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <LoadingOverlay isLoading={isLoading} />
    </Layout>
  );
};

export default Setting;
