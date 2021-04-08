
const mongoose = require('mongoose')
const express = require('express')
const PostMessage = require('../models/postMessage')
const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
    res.status(200).json(postMessages)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
const createPost = async (req, res) => {
  const post = req.body
  const newPost = new PostMessage(post)
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (err) {
    res.status(409).json({ message: err.message + 'add not work' })
  }
}

const updatePost = async (req, res) => {
  const post = req.body
  const { id: _id } = req.params
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post to update with that Id')
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.json(updatedPost)
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}
const deletePost = async (req, res) => {
  const { id: _id } = req.params
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post to delete with that Id')
  try {
    await PostMessage.findByIdAndRemove(_id)
    res.json({ message: 'post deleted secessfully' })
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}
const likePost = async (req, res) => {
  const { id: _id } = req.params
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post to update likes with that Id')
  try {
    const post = await PostMessage.findById(_id)
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true })
    res.json(updatedPost)
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}
module.exports = {
  likePost,
  deletePost,
  updatePost,
  createPost,
  getPosts
}