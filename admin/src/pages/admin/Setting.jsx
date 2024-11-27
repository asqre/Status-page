import React, { useState, useEffect } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Layout from "@/components/layout/Layout";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import axios from "@/api/axios";
import { useSelector } from "react-redux";

const Setting = () => {
  const [copied, setCopied] = useState(false);
  const { organizationDetails } = useSelector((state) => state.organizations);

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

        {/* Add Member */}
        {/* <div className="mt-8">
          <h2 className="text-xl font-bold">Add Member</h2>
          <div className="flex gap-4 mt-4">
            <input
              type="text"
              placeholder="Member Name"
              value={newMember.user}
              onChange={(e) =>
                setNewMember({ ...newMember, user: e.target.value })
              }
              className="border rounded p-2 flex-grow"
            />
            <input
              type="text"
              placeholder="Role"
              value={newMember.role}
              onChange={(e) =>
                setNewMember({ ...newMember, role: e.target.value })
              }
              className="border rounded p-2 flex-grow"
            />
            <input
              type="text"
              placeholder="User ID"
              value={newMember.user_id}
              onChange={(e) =>
                setNewMember({ ...newMember, user_id: e.target.value })
              }
              className="border rounded p-2 flex-grow"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={addMember}
            >
              Add
            </button>
          </div>
        </div> */}

        {/* Member List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Members</h2>
          <ul className="mt-4">
            {/* {members.map((member) => (
            <li key={member.user_id} className="flex justify-between p-2 border rounded mb-2">
              <span>{member.user}</span>
              <span className="text-gray-500">{member.role}</span>
            </li>
          ))} */}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Setting;
