"use server";
import { sampleBlogs } from "../data/data";
import prisma from "./utils";

const users = [
  {
    name: "Alex Rivera",
    civicProvidedPublicKey: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  },
  {
    name: "Maya Johnson",
    civicProvidedPublicKey: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  },
  {
    name: "Jaime Chen",
    civicProvidedPublicKey: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  },
  {
    name: "Alice Smith",
    civicProvidedPublicKey: "0x1A1B1C1D1E1F1A1B1C1D1E1F1A1B1C1D1E1F1A1B",
  },
  {
    name: "Bob Johnson",
    civicProvidedPublicKey: "0x2A2B2C2D2E2F2A2B2C2D2E2F2A2B2C2D2E2F2A2B",
  },
];

async function main() {
  console.log("Start seeding ...");

  // Create users
  const createdUsers = await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: user,
      })
    )
  );
  console.log(`Created ${createdUsers.length} users.`);

  // Create blogs and connect to authors
  for (const blogData of sampleBlogs) {
    const author = createdUsers.find(
      (user) => user.civicProvidedPublicKey === blogData.author.walletAddress
    );

    if (!author) {
      console.warn(
        `Author with wallet address ${blogData.author.walletAddress} not found. Skipping blog "${blogData.title}".`
      );
      continue;
    }

    const blog = await prisma.blog.create({
      data: {
        id: blogData.id,
        title: blogData.title,
        imageUrl: blogData.imageUrl,
        excerpt: blogData.excerpt,
        content: blogData.content,
        tags: blogData.tags.join(","), // Store tags as a comma-separated string
        isPremium: blogData.isPremium,
        blogOwnerId: author.id,
      },
    });
    console.log(`Created blog with id: ${blog.id}`);
  }

  // Find created users to assign likes and tips
  const alex = createdUsers.find(
    (user) => user.name === "Alex Rivera"
  ) as (typeof createdUsers)[0];
  const maya = createdUsers.find(
    (user) => user.name === "Maya Johnson"
  ) as (typeof createdUsers)[0];
  const alice = createdUsers.find(
    (user) => user.name === "Alice Smith"
  ) as (typeof createdUsers)[0];
  const bob = createdUsers.find(
    (user) => user.name === "Bob Johnson"
  ) as (typeof createdUsers)[0];

  // Add some likes
  const blog1 = await prisma.blog.findUnique({ where: { id: "1" } });
  const blog2 = await prisma.blog.findUnique({ where: { id: "2" } });
  const blog3 = await prisma.blog.findUnique({ where: { id: "3" } });

  if (blog1 && alice) {
    await prisma.like.create({
      data: {
        blogId: blog1.id,
        userId: alice.id,
      },
    });
    console.log(`Alice liked blog ${blog1.id}`);
  }

  if (blog1 && bob) {
    await prisma.like.create({
      data: {
        blogId: blog1.id,
        userId: bob.id,
      },
    });
    console.log(`Bob liked blog ${blog1.id}`);
  }

  if (blog2 && alex) {
    await prisma.like.create({
      data: {
        blogId: blog2.id,
        userId: alex.id,
      },
    });
    console.log(`Alex liked blog ${blog2.id}`);
  }

  if (blog3 && maya) {
    await prisma.like.create({
      data: {
        blogId: blog3.id,
        userId: maya.id,
      },
    });
    console.log(`Maya liked blog ${blog3.id}`);
  }

  // Add some tips
  if (blog1 && alice) {
    await prisma.tip.create({
      data: {
        blogId: blog1.id,
        fromAddress: alice.civicProvidedPublicKey,
        amount: 1000000, // Example amount in smallest unit (e.g., lamports for Solana)
        initiatedByUserId: alice.id,
      },
    });
    console.log(`Alice tipped blog ${blog1.id}`);
  }

  if (blog2 && bob) {
    await prisma.tip.create({
      data: {
        blogId: blog2.id,
        fromAddress: bob.civicProvidedPublicKey,
        amount: 500000,
        initiatedByUserId: bob.id,
      },
    });
    console.log(`Bob tipped blog ${blog2.id}`);
  }

  if (blog3 && alex) {
    await prisma.tip.create({
      data: {
        blogId: blog3.id,
        fromAddress: alex.civicProvidedPublicKey,
        amount: 2000000,
        initiatedByUserId: alex.id,
      },
    });
    console.log(`Alex tipped blog ${blog3.id}`);
  }

  // Add some transactions (representing tips or purchases)
  if (alice && alex && blog1) {
    await prisma.transaction.create({
      data: {
        fromAddress: alice.civicProvidedPublicKey,
        toAddress: alex.civicProvidedPublicKey, // Assuming tip goes to author
        amount: 1000000,
        initiatedByUserId: alice.id,
        txSignature: "sample-tx-signature-1",
      },
    });
    console.log(`Created transaction for tip from Alice to Alex`);
  }

  if (bob && maya && blog2) {
    await prisma.transaction.create({
      data: {
        fromAddress: bob.civicProvidedPublicKey,
        toAddress: maya.civicProvidedPublicKey,
        amount: 500000,
        initiatedByUserId: bob.id,
        txSignature: "sample-tx-signature-2",
      },
    });
    console.log(`Created transaction for tip from Bob to Maya`);
  }

  // Simulate a user purchasing a premium blog
  if (alice && blog3) {
    await prisma.user.update({
      where: { id: alice.id },
      data: {
        purchasedBlogs: {
          connect: { id: blog3.id },
        },
      },
    });
    console.log(`Alice purchased blog ${blog3.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
