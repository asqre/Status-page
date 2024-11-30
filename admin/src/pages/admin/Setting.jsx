import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  LuCopy,
  LuCopyCheck,
  LuUsers,
  LuUserPlus,
  LuLink,
} from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userRoles } from "@/data";
import {
  addMember,
  fetchMembers,
  setMemberData,
} from "@/redux/organizations/organizationSlice";
import Layout from "@/components/layout/Layout";

const Setting = () => {
  const [copied, setCopied] = useState(false);
  const organizationDetails = JSON.parse(
    sessionStorage.getItem("organization")
  );
  const { memberData, members } = useSelector((state) => state.organizations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      dispatch(addMember(memberData));
    } catch (error) {
      console.error("Failed to add member:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setMemberData({ [id]: value }));
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-4xl overflow-auto h-[95vh] hide-scrollbar">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <LuUsers className="mr-3 text-blue-600" />
            Organization Settings
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your organization's members and settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LuLink className="mr-2 text-blue-600" />
                Public Page URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                <span className="flex-grow text-sm text-gray-700 truncate">
                  {window.location.origin}/organization/
                  {organizationDetails?.slug}
                </span>
                <CopyToClipboard
                  text={`${window.location.origin}/organization/${organizationDetails?.slug}`}
                  onCopy={handleCopy}
                >
                  <button className="ml-2 text-gray-500 hover:text-blue-600 transition-colors">
                    {copied ? (
                      <LuCopyCheck className="text-green-500" />
                    ) : (
                      <LuCopy />
                    )}
                  </button>
                </CopyToClipboard>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LuUserPlus className="mr-2 text-green-600" />
                Add New Member
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddMember} className="space-y-4">
                <Input
                  id="userName"
                  type="text"
                  placeholder="Member Name"
                  value={memberData.userName}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-blue-500"
                />

                <Input
                  id="userEmail"
                  type="email"
                  placeholder="Member Email"
                  value={memberData.userEmail}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-blue-500"
                />

                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={memberData.password}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-blue-500"
                />
                <select
                  id="role"
                  value={memberData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
                  required
                >
                  <option value="">Select Role</option>
                  {userRoles.map((roleOption) => (
                    <option key={roleOption.value} value={roleOption.value}>
                      {roleOption.label}
                    </option>
                  ))}
                </select>
                <Button type="submit" className="w-full">
                  "Add Member"
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <LuUsers className="mr-2 text-purple-600" />
              Organization Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            {members.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                No members found. Invite your team!
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {members.map((member, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-gray-800">
                        {member?.userName}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {member?.userEmail}
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {member?.role.toLowerCase()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Setting;
